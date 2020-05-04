import { hotelRatingUpdateEmmiter } from '../events';
import { UserDataAccess, HotelDataAccess } from '../data';
import logger from '../logger';

const favoriteHotelController = async (req, res, next) => {
  const { hotelID } = req.params;

  try {
    if (req.user.favorites.includes(hotelID)) {
      res.status(400).send('Hotel already favorited.');
    } else {
      const searchQuery = { _id: req.user.id };
      const data = {
        favorites: [
          ...req.user.favorites,
          hotelID,
        ],
      };
      const userDataAccess = new UserDataAccess({ searchQuery, data });
      await userDataAccess.updateUser();
      logger.info(`Hotel with id ${hotelID} successfully favorited!`);
      hotelRatingUpdateEmmiter.emit('update', hotelID, 'favorites');
      res.sendStatus(200);
    }
  } catch (error) {
    next(error);
  }
};

const unfavoriteHotelController = async (req, res, next) => {
  const { hotelID } = req.params;

  try {
    if (!req.user.favorites.includes(hotelID)) {
      res.status(400).send('Hotel already unfavorited.');
    } else {
      const searchQuery = { _id: req.user.id };
      const favorites = req.user.favorites.filter((favHotelID) => String(favHotelID) !== hotelID);
      const data = {
        favorites,
      };
      const userDataAccess = new UserDataAccess({ searchQuery, data });
      await userDataAccess.updateUser();
      logger.info(`Hotel with id ${hotelID} successfully unfavorited!`);
      hotelRatingUpdateEmmiter.emit('update', hotelID, 'unfavorites');
      res.sendStatus(200);
    }
  } catch (error) {
    next(error);
  }
};

const viewfavoriteHotelsController = async (req, res, next) => {
  const { user } = req;
  const searchQuery = { _id: { $in: user.favorites } };

  try {
    const hotelDataAccess = new HotelDataAccess({ searchQuery });
    const favoriteHotels = await hotelDataAccess.fetchHotels();

    res.send(favoriteHotels);
  } catch (error) {
    next(error);
  }
};


export default {
  favoriteHotelController,
  unfavoriteHotelController,
  viewfavoriteHotelsController,
};

import { UserDataAccess, HotelDataAccess } from '../data';
import { ratingTable } from '../utils';
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
      const hotel = await HotelDataAccess.fetchHotel({ _id: hotelID });
      hotel.rating += ratingTable.favorites;
      await hotel.save();

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
      const hotel = await HotelDataAccess.fetchHotel({ _id: hotelID });
      hotel.rating += ratingTable.unfavorites;
      await hotel.save();
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
    const favoriteHotels = await HotelDataAccess.fetchHotels(searchQuery);

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

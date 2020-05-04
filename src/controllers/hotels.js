import { parse } from 'url';

import { HotelDataAccess } from '../data';
import logger from '../logger';

const getHotelController = async (req, res, next) => {
  const { hotelID } = req.params;
  const searchQuery = { _id: hotelID };
  try {
    const hotelDataAccess = new HotelDataAccess({ searchQuery });
    const hotel = await hotelDataAccess.fetchHotel();

    if (hotel) {
      logger.info(`Found hotel: ${JSON.stringify(hotel)}`);
      res.send(hotel);
    } else {
      logger.info(`Couldn't find the hotel with id: ${hotelID}`);
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};

const getHotelsController = async (req, res, next) => {
  const queryObject = parse(req.url, true).query;

  const searchQuery = {};
  if (queryObject) {
    if (queryObject.name) {
      searchQuery.name = { $regex: `.*${queryObject.name}.*` };
    }
    if (queryObject.address) {
      searchQuery.address = { $regex: `.*${queryObject.address}.*` };
    }
  }

  try {
    const hotelDataAccess = new HotelDataAccess({
      searchQuery,
      additionalOptions: { sort: { name: 1 } },
    });
    const hotels = await hotelDataAccess.fetchHotels();

    res.send(hotels);
  } catch (error) {
    next(error);
  }
};

const createHotelController = async (req, res, next) => {
  const newHotel = req.body;
  try {
    const hotelDataAccess = new HotelDataAccess({ data: newHotel });
    await hotelDataAccess.createHotel();
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
};

const updateHotelController = async (req, res, next) => {
  const updatedHotel = req.body;
  const { hotelID } = req.params;
  const searchQuery = { _id: hotelID };
  try {
    const hotelDataAccess = new HotelDataAccess({ data: updatedHotel, searchQuery });
    const hotel = await hotelDataAccess.updateHotel();
    if (hotel) {
      logger.info(`Successfully updated hotel ${hotelID} with new values ${JSON.stringify(updatedHotel)}`);
      res.sendStatus(200);
    } else {
      logger.info(`Hotel not found with ID ${hotelID}`);
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};


export default {
  getHotelController,
  getHotelsController,
  createHotelController,
  updateHotelController,
};

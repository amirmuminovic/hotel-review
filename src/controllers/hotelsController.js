import logger from '../logger';
import HotelService from '../services/HotelService';
import HotelSchema from '../validations/HotelSchema';
import SearchItemSchema from '../validations/SearchItemSchema';

const getHotelController = async (req, res, next) => {
  const { hotelID } = req.params;
  const searchQuery = { _id: hotelID };
  try {
    const hotel = await HotelService.getHotel(searchQuery);

    if (hotel) {
      logger.info(`Found hotel: ${hotelID}`);
      res.send(hotel);
    } else {
      logger.info(`Couldn't find the hotel with id: ${hotelID}`);
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};

const deleteHotelController = async (req, res, next) => {
  const { hotelID } = req.params;
  const searchQuery = { _id: hotelID };
  try {
    const hotel = await HotelService.deleteHotel(searchQuery);

    if (hotel) {
      logger.info(`Found hotel: ${hotelID}`);
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
  const searchQuery = req.body;

  try {
    const validatedQuery = await SearchItemSchema.validateAsync(searchQuery);
    const hotels = await HotelService.getHotels(validatedQuery);
    res.send(hotels);
  } catch (error) {
    next(error);
  }
};

const createHotelController = async (req, res, next) => {
  const newHotel = req.body;
  try {
    const validatedHotel = await HotelSchema.validateAsync(newHotel);

    await HotelService.createHotel(validatedHotel);
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
    const validatedHotel = await HotelSchema.validateAsync(updatedHotel);

    const hotel = await HotelService.updateHotel(validatedHotel, searchQuery);
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
  deleteHotelController,
};

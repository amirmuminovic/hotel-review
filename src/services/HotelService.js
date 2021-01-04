import hotelDataAccess from '../data/HotelDataAccess';
import { ReviewModel } from '../models';
import { mapOperatorsToGroups, mapSortsTogether } from '../utils';

const getHotel = async (searchQuery) => hotelDataAccess.fetchHotel(searchQuery);

const deleteHotel = async (searchQuery) => {
  const deletedHotel = await hotelDataAccess.deleteHotel(searchQuery);
  if (deleteHotel) {
    await ReviewModel.deleteMany({ hotelID: deletedHotel.id });
  }
  return deletedHotel;
};

const getHotels = async ({ sort, paging, query }) => {
  const searchQuery = mapOperatorsToGroups(query);
  const sorting = mapSortsTogether(sort);

  return hotelDataAccess.fetchHotels(searchQuery, sorting, paging);
};

const createHotel = async (newHotel) => hotelDataAccess.createHotel(newHotel);

const updateHotel = async (updatedHotel, searchQuery) => hotelDataAccess.updateHotel(
  updatedHotel, searchQuery,
);

const hotelService = {
  getHotel,
  getHotels,
  createHotel,
  updateHotel,
  deleteHotel,
};

export default hotelService;

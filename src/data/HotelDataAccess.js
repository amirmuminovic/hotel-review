import { HotelModel } from '../models';

async function createHotel(data) {
  return HotelModel.create(data);
}

async function updateHotel(data, searchQuery) {
  return HotelModel.findOneAndUpdate(searchQuery, data);
}

async function fetchHotel(searchQuery) {
  return HotelModel.findOne(searchQuery);
}

async function deleteHotel(searchQuery) {
  return HotelModel.findOneAndDelete(searchQuery);
}

async function fetchHotels(query, sorting, paging) {
  const searchQuery = query || {};
  const additionalOptions = {};

  if (paging) {
    const { page, pageSize } = paging;
    additionalOptions.limit = pageSize;
    additionalOptions.skip = pageSize * page;
  } else {
    additionalOptions.limit = 10;
    additionalOptions.skip = 0;
  }
  if (sorting) {
    additionalOptions.sort = sorting;
  }

  const count = await HotelModel.count(searchQuery);
  const data = await HotelModel.find(searchQuery, null, additionalOptions);

  return {
    data,
    count,
  };
}

const hotelDataAccess = {
  createHotel,
  updateHotel,
  fetchHotel,
  deleteHotel,
  fetchHotels,
};

export default hotelDataAccess;

import EventEmitter from 'events';

import { HotelDataAccess } from '../data';
import { ratingTable } from '../utils';

const hotelRatingUpdateEmmiter = new EventEmitter();

hotelRatingUpdateEmmiter.on('update', async (id, eventType, undoFactor = 1) => {
  const hotelDataAccess = new HotelDataAccess({ searchQuery: { _id: id } });
  const hotel = await hotelDataAccess.fetchHotel();
  const rating = hotel.rating + ratingTable[eventType] * undoFactor;
  hotelDataAccess.setData({ rating });
  await hotelDataAccess.updateHotel();
});

export default hotelRatingUpdateEmmiter;

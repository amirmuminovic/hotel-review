import { HotelModel } from '../models';


class HotelDataAccess {
  constructor({ data, searchQuery, additionalOptions }) {
    this.data = data;
    this.searchQuery = searchQuery;
    this.additionalOptions = additionalOptions;
  }

  setData(data) {
    this.data = data;
  }

  async createHotel() {
    return HotelModel.create(this.data);
  }

  async updateHotel() {
    return HotelModel.findOneAndUpdate(this.searchQuery, this.data);
  }

  async fetchHotel() {
    return HotelModel.findOne(this.searchQuery);
  }

  async deleteHotel() {
    return HotelModel.findOneAndDelete(this.searchQuery);
  }

  async fetchHotels() {
    return HotelModel.find(this.searchQuery, null, this.additionalOptions);
  }
}

export default HotelDataAccess;

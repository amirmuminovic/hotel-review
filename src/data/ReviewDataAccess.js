import { ReviewModel } from '../models';


class ReviewDataAccess {
  constructor({ data, searchQuery, additionalOptions }) {
    this.data = data;
    this.searchQuery = searchQuery;
    this.additionalOptions = additionalOptions;
  }

  setData(data) {
    this.data = data;
  }

  async createReview() {
    return ReviewModel.create(this.data);
  }

  async updateReview() {
    return ReviewModel.findOneAndUpdate(this.searchQuery, this.data);
  }

  async fetchReview() {
    return ReviewModel.findOne(this.searchQuery);
  }

  async deleteReview() {
    return ReviewModel.findOneAndDelete(this.searchQuery);
  }

  async fetchReviews() {
    return ReviewModel.find(this.searchQuery, null, this.additionalOptions);
  }
}

export default ReviewDataAccess;

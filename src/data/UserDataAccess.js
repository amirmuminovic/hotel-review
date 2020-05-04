import { hash } from 'bcryptjs';
import { randomBytes } from 'crypto';

import { UserModel } from '../models';


class UserDataAccess {
  constructor({ data, searchQuery }) {
    this.data = data;
    this.searchQuery = searchQuery;
  }

  setSearchQuery(searchQuery) {
    this.searchQuery = searchQuery;
  }

  async createUser() {
    this.data.password = await hash(this.data.password, 12);
    const confirmationCode = randomBytes(32).toString('hex');

    const user = await UserModel.create({
      ...this.data,
      confirmationCode,
      confirmationCodeExpiration: new Date(Date.now() + 2 * 60 * 60 * 1000),
      valid: false,
    });

    return user;
  }

  async updateUser() {
    return UserModel.findOneAndUpdate(this.searchQuery, this.data);
  }

  async fetchUser() {
    return UserModel.findOne(this.searchQuery);
  }

  async deleteUser() {
    return UserModel.findOneAndDelete(this.searchQuery);
  }

  async fetchUsers() {
    return UserModel.find(this.searchQuery);
  }
}

export default UserDataAccess;

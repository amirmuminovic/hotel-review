import { compare } from 'bcryptjs';
import { createTransport } from 'nodemailer';
import sendgridTransport from 'nodemailer-sendgrid-transport';

import config from '../config';

import { UserDataAccess } from '../data';

class UserService {
  constructor(user, options) {
    this.user = user;
    if (options && options.mailTransport) {
      this.transporter = createTransport(
        sendgridTransport({
          auth: {
            api_key: config.sendgridAPIKey,
          },
        }),
      );
    }
  }

  async registerUser() {
    this.transporter.sendMail({
      to: this.user.email,
      from: 'amir.muminovic192+1@gmail.com',
      subject: 'Welcome to HotelReview!',
      html: `
        <p>Dear ${this.user.name}, welcome to HotelReview!</p>
        <p>Click the following <a href="http://localhost:3000/register/${this.user.confirmationCode}">link</a> to confirm your registration.</p>
      `,
    });
  }

  async confirmRegistration() {
    const searchQuery = { name: this.user.name };
    const data = {
      valid: true,
      confirmationCode: undefined,
      confirmationCodeExpiration: undefined,
    };
    const userDataAccess = new UserDataAccess({ searchQuery, data });
    await userDataAccess.updateUser();
  }

  async comparePasswords(password) {
    return compare(password, this.user.password);
  }
}

export default UserService;

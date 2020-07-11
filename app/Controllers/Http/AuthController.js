"use strict";

const User = use("App/Models/User");
const ApplicationException = use("App/Exceptions/ApplicationException");

class AuthController {
  async register({ request, response }) {
    const data = request.only(["username", "email", "password"]);

    const existingUser = await User.findBy("email", data.email);

    if (existingUser) {
      throw new ApplicationException("Email already registered");
    }

    try {
      const user = await User.create(data);
      return user;
    } catch {
      throw new ApplicationException("Error on create user");
    }
  }

  async login({ request, response, auth }) {
    const { email, password } = request.all();

    const token = await auth.withRefreshToken().attempt(email, password, true);

    return token;
  }

  async refreshToken({ request, response, auth }) {
    const { refreshToken } = request.all();

    const token = await auth.generateForRefreshToken(refreshToken, true);

    return token;
  }
}

module.exports = AuthController;

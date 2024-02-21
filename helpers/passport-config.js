const LocalStrategy = require("passport-local").Strategy;
const Jwtstrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcrypt");

const User = require("../models/user");

// Authenticate using JSONWebToken
exports.jwtStrategy = new Jwtstrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.TOKEN_SECRET,
    passReqToCallback: true,
  },
  async (req, data, done) => {
    if (!data) {
      return done(null, null, { message: "Invalid token" });
    }
    req.user = data.data;
    return done(null, data.data);
  }
);

// Authenticate using refresh JSONWebToken to receive valid token
exports.refreshJwtStrategy = new Jwtstrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.REFRESH_TOKEN_SECRET,
  },
  async (data, done) => {
    if (!data) {
      return done(null, null, { message: "Invalid token" });
    }
    return done(null, data.data);
  }
);

// Authenticate using email and password
exports.localStrategy = new LocalStrategy(
  { usernameField: "email", passwordField: "password" },
  async (email, password, done) => {
    try {
      // Search for existing user
      const result = await User.findOne({ email: email });
      if (!result) {
        return done(null, false, { message: "User not found" });
      }
      // Check encrypted password with provided password
      const passwordMatches = await bcrypt.compare(password, result.password);

      if (!passwordMatches) {
        return done(null, false, { message: "Invalid credentials" });
      }

      // Return user to sign as JSONWebToken
      const user = {
        id: result._id.toString(),
        first_name: result.first_name,
        last_name: result.last_name,
        username: result.username,
        email: result.email,
        password: result.password,
      };

      return done(null, user, { message: "User logged in" });
    } catch (error) {
      return done(error);
    }
  }
);

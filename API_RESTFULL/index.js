const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const PORT = process.env.PORT || 3000;
const userRouter = require("./routes/user");
const { ValidationError } = require("sequelize");
const User = require("./models/User");
const app = express();

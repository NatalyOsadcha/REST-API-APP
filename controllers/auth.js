const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const crypto = require("crypto");
const path = require("path");
const fs = require("fs/promises");

const { User } = require("../models/user");
const { HttpError, wrapper } = require("../helpers");

const avatarDir = path.join(__dirname, "../", "public", "avatars");

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  // const emailHash = crypto.createHash('md5').update(email).digest('hex');
  // const avatarURL = `https://www.gravatar.com/avatar/${emailHash}.jpg?d=monsterid`;

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, " Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, " Email or password is wrong");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "17h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({ email, subscription });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json();
};

const updateSubscriptionUser = async (req, res) => {
  const { id } = req.params;
  const { email, subscription } = req.user;
  const result = await User.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ email, subscription });
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const fileName = `${_id}_${originalname}`
  const resultUpload = path.join(avatarDir, fileName);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", fileName);
  await User.findByIdAndUpdate(_id, avatarURL);

  res.json({ avatarURL });
};

module.exports = {
  register: wrapper(register),
  login: wrapper(login),
  getCurrent: wrapper(getCurrent),
  logout: wrapper(logout),
  updateSubscriptionUser: wrapper(updateSubscriptionUser),
  updateAvatar: wrapper(updateAvatar),
};

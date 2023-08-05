const express = require("express");

const { validateBody, authenticate, isValidId, upload } = require("../middlewares");
const {
  register,
  login,
  getCurrent,
  logout,
  updateSubscriptionUser,
  updateAvatar,
} = require("../controllers/auth");

const router = express.Router();

const { authSchema, updateSubscriptionSchema } = require("../models/user");

router.post("/register", validateBody(authSchema), register);

router.post("/login", validateBody(authSchema), login);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

router.patch(
  "/:id/subscription",
  authenticate,
  isValidId,
  validateBody(updateSubscriptionSchema),
  updateSubscriptionUser
);

router.patch('/avatars', authenticate, upload.single('avatar'), updateAvatar)

module.exports = router;

const express = require("express");

const router = express.Router();

const {
  isValidId,
  validateBody,
  bodyLengthCheck,
  authenticate,
} = require("../../middlewares");
const { addSchema, updateFavoriteSchema } = require("../../models/contact");

const {
  getAll,
  getById,
  addContact,
  deleteContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contactControllers");

router.get("/",authenticate, getAll);

router.post("/",authenticate, bodyLengthCheck, validateBody(addSchema), addContact);

router.get("/:id",authenticate, isValidId, getById);

router.delete("/:id",authenticate, isValidId, deleteContact);

router.put(
  "/:id", authenticate,
  isValidId,
  bodyLengthCheck,
  validateBody(addSchema),
  updateContact
);

router.patch(
  "/:id/favorite", authenticate,
  isValidId,
  validateBody(updateFavoriteSchema),
  updateStatusContact,
);

module.exports = router;

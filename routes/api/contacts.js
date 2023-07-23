const express = require("express");

const router = express.Router();

const {
  isValidId,
  validateBody,
  bodyLengthCheck,
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

router.get("/", getAll);

router.post("/", bodyLengthCheck, validateBody(addSchema), addContact);

router.get("/:id", isValidId, getById);

router.delete("/:id", isValidId, deleteContact);

router.put(
  "/:id",
  isValidId,
  bodyLengthCheck,
  validateBody(addSchema),
  updateContact
);

router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(updateFavoriteSchema),
  updateStatusContact,
);

module.exports = router;

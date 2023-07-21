const express = require("express");

const router = express.Router();

const {
  getAll,
  getById,
  addContact,
  deleteContact,
  updateContact,
} = require("../../controllers/contactControllers");

router.get("/", getAll);

router.get("/:id", getById);

router.post("/", addContact);

router.delete("/:id", deleteContact);

router.put("/:id", updateContact);

module.exports = router;

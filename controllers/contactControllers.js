const { Contact } = require("../models/contact");
const { HttpError, wrapper } = require("../helpers");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite  } = req.query;
  const skip = (page - 1) * limit;
  const filter = { owner };

  if (favorite === 'true') {
    filter.favorite = true;
  }
  const result = await Contact.find(filter, '-createdAt, -updatedAt', {skip, limit}).populate('owner', 'name email');
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const {_id: owner} = req.user;
  const result = await Contact.create({...req.body, owner});
  res.status(201).json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "Contact deleted" });
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  getAll: wrapper(getAll),
  getById: wrapper(getById),
  addContact: wrapper(addContact),
  deleteContact: wrapper(deleteContact),
  updateContact: wrapper(updateContact),
  updateStatusContact: wrapper(updateStatusContact),
};

import Contact from "../models/contact.js";

export const getAllContacts = async (req, res) => {
  try { res.json(await Contact.find()); } 
  catch (err) { res.status(500).json({ message: err.message }); }
};

export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.json(contact);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const createContact = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    res.status(201).json(await contact.save());
  } catch (err) { res.status(400).json({ message: err.message }); }
};

export const updateContact = async (req, res) => {
  try { res.json(await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true })); }
  catch (err) { res.status(400).json({ message: err.message }); }
};

export const deleteContact = async (req, res) => {
  try { await Contact.findByIdAndDelete(req.params.id); res.json({ message: "Contact deleted" }); }
  catch (err) { res.status(500).json({ message: err.message }); }
};

export const deleteAllContacts = async (req, res) => {
  try { await Contact.deleteMany(); res.json({ message: "All contacts deleted" }); }
  catch (err) { res.status(500).json({ message: err.message }); }
};

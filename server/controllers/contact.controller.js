import Contact from "../models/contact.js";

// USER — create a contact message (public form)
export const createContact = async (req, res) => {
  console.log("POST BODY:", req.body);
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json({
      message: "Message submitted successfully",
      contact,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// ADMIN — get all messages
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADMIN — delete a message
export const deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Contact message deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

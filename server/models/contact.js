const mongoose = require("mongoose");


const contactSchema = new mongoose.Schema({
	fullName: { type: String, required: true },
	email: { type: String, required: true },
	subject: { type: String, required: true },
	message: { type: String, required: true },
});

module.exports = mongoose.model("contact", contactSchema);


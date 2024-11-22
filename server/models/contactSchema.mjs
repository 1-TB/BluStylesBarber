import mongoose from 'mongoose';
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['new', 'read', 'responded'], default: 'new' }
}, { timestamps: true });

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;
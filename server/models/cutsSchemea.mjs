import mongoose from 'mongoose';
const cutsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  time: { type: Number, required: true }, // in minutes
  price: { type: Number, required: true },
  picture: { type: String, required: true },
  specialty: { type: Boolean, default: false },
  popular: { type: Boolean, default: false }
}, { timestamps: true });

const Cut = mongoose.model('Cut', cutsSchema);
export default Cut;
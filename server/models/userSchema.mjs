import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  isStaff: { type: Boolean, default: false },
  resetPasswordToken: String,
  resetPasswordExpires: Date
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
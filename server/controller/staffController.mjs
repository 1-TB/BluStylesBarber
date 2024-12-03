import express from 'express';
import User from '../models/userSchema.mjs';
import validateEmail from '../utils/validateEmail.mjs';
import bcrypt from "bcryptjs";

export const postStaff = async (req, res) => {
  try {
    let { email, password, image, name, role, isAdmin, isStaff } = req.body;
    
    if (!name || !password || !email || !image || !role) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    if (!image) {
      return res.status(400).json({ error: "No image provided" });
    }

    // Optional: Validate base64 image
    if (!image.startsWith('data:image')) {
      return res.status(400).json({ error: "Invalid image format" });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword)
    password = hashedPassword;
    const newStaff = new User({
      email,
      password,
      image,
      name,
      role,
      isAdmin,
      isStaff
    });

    await newStaff.save();
    res.status(201).json(newStaff);
  } catch (error) {
    console.error('Error creating client:', error);
    res.status(500).json({ message: 'Failed to create client' });
  }
};

export const getAllStaff = async (req, res) => {
  try {
    const users = await User.find({},'name role image');
    res.send(users)
  } catch (err) {
    console.error('Unable to fetch all staffs,', err);
    res.status(500).json({ message: 'Failed to get staffs.'});
  }
}

export const deleteStaffbyId = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteStaff = await User.deleteOne({_id: id});
    
    if (!deleteStaff) {
     res.status(404).json({ message: 'Unable to find Staff.'})
     return;
    } 

    return res.status(200).json({
      message: 'Staff deleted successfully',
      staff: deleteStaff,
    });

  } catch (error) {
    console.error('Unable to delete Staff,',error);
    res.status(500).json({ message: 'Failed to delete Staff.'})
  }

}

export const editStaffById = async (req, res) => {
  try {
  const {id} = req.params;
  console.log(id)
  const staffUpdates = req.body;

  const salt = await bcrypt.genSalt(10);
  staffUpdates.password = await bcrypt.hash(updates.password, salt);

  const updatedStaff = await User.findByIdAndUpdate(
    id,
    {
      $set: staffUpdates
    },
    { new: true, runValidators: true}
  ).select('-password');

  if (!updatedStaff) {
    return res.status(404).json({ message: 'Staff not found' });
  }

  res.json(updatedStaff);
  }catch (error) {
    res.status(400).json({ message: 'Error updating staff', error: error.message });
  }
}
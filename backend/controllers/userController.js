import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const updates = req.body;

    if (updates.password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(updates.password, salt);
    }

    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true });
    res.status(200).json({ message: 'Profile updated', user });
  } catch (err) {
    next(err);
  }
};

export const addTeamMember = async (req, res, next) => {
  try {
    const { firstName, lastName, email, designation } = req.body;
    const adminUser = await User.findById(req.user.id);
    
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Team member with this email already exists' });

    const teamMember = new User({
      firstName: firstName,
      lastName: lastName,
      email,
      password: adminUser.password,
      role: designation,
      admin: adminUser._id
    });

    const savedMember = await teamMember.save();
    res.status(201).json({ message: 'Team member added', user: savedMember });
  } catch (err) {
    next(err);
  }
};

export const getTeamMembers = async (req, res, next) => {
  try {
    const members = await User.find({ admin: req.user.id });
    res.status(200).json({ members });
  } catch (err) {
    next(err);
  }
};

export const updateTeamMember = async (req, res, next) => {
  try {
    console.log('Updating team member:', req.body, ", params is : ", req.params);
    const { firstName, lastName, email, designation } = req.body;
    const { memberId } = req.params;

    const updatedMember = await User.findByIdAndUpdate(
      memberId,
      { firstName, lastName, email, designation },
      { new: true }
    );

    if (!updatedMember) return res.status(404).json({ message: 'Team member not found' });

    res.status(200).json({ message: 'Team member updated', user: updatedMember });
  } catch (err) {
    next(err);
  }
};

export const removeTeamMember = async (req, res, next) => {
  try {
    const { memberId } = req.params;
    const deletedMember = await User.findByIdAndDelete(memberId);

    if (!deletedMember) return res.status(404).json({ message: 'Team member not found' });

    res.status(200).json({ message: 'Team member removed', user: deletedMember });
  } catch (err) {
    next(err);
  }
};

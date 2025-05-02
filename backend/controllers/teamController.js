import User from '../models/User.js';
import Team from '../models/Team.js';

export const getTeamMembers = async (req, res, next) => {
  try {
    
    const team = await Team.findOne({ admin: req.user._id }).populate('members', 'name email role');
    if (!team) {
      return res.status(404).json({ message: 'Team not found.' });
    }
    res.json(team.members);
  } catch (error) {
    next(error);
  }
};

export const addTeamMember = async (req, res, next) => {
  try {
    const { email } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    let team = await Team.findOne({ admin: req.user._id });
    if (!team) {
      
      team = await Team.create({ admin: req.user._id, members: [] });
    }

    if (team.members.includes(user._id)) {
      return res.status(400).json({ message: 'User already in team.' });
    }

    team.members.push(user._id);
    await team.save();
    res.json(team);
  } catch (error) {
    next(error);
  }
};

export const removeTeamMember = async (req, res, next) => {
  try {
    const { memberId } = req.params;
    const team = await Team.findOne({ admin: req.user._id });
    if (!team) {
      return res.status(404).json({ message: 'Team not found.' });
    }
    team.members = team.members.filter((id) => id.toString() !== memberId);
    await team.save();
    res.json(team);
  } catch (error) {
    next(error);
  }
};

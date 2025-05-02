import asyncHandler from 'express-async-handler';
import Visitor from '../models/Visitor.js';

export const createVisitor = asyncHandler(async (req, res) => {
  const { name, phone, email } = req.body;
  if (!name || !phone || !email) {
    res.status(400);
    throw new Error('Name, phone, and email are required');
  }
  
  let visitor = await Visitor.findOne({ email });
  if (!visitor) {
    visitor = await Visitor.create({ name, phone, email });
  }
  res.status(201).json(visitor);
});

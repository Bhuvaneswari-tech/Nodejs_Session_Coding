const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { registerValidator } = require('../utils/validator');
const catchAsync = require('../utils/catch');

exports.register = catchAsync(async (req,res) => {
  const { error } = registerValidator(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) return res.status(400).json({ message: 'Email already exists' });

  const user = await User.create(req.body);
  res.status(201).json({ message: 'User registered', user });
});

exports.login = catchAsync(async (req,res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const isMatch = await user.matchPassword(password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

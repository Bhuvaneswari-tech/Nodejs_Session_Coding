const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { username, password } = req.body;

  // Hardcoded example
  if (username === 'manager' && password === 'manager123') {
    const token = jwt.sign(
      { username, role: 'manager' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    return res.json({ token });
  }

  res.status(401).json({ error: 'Invalid credentials' });
};

//jwt.sign(payload, secret, options) - creates a JWT token
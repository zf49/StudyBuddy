const User = require('../models/user');



exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.comparePassword(password)) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
      return res.json({ message: 'Login successful', data: { user } });
  }
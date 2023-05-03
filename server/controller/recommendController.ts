const User = require('../models/user');



exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    
    // 查询数据库中是否存在该用户
    const user = await User.findOne({ email });
  
    // 如果用户不存在或密码不匹配，则返回错误响应
    if (!user || !user.comparePassword(password)) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
  
    // 如果用户存在且密码匹配，则返回成功响应
    return res.json({ message: 'Login successful', data: { user } });
  }
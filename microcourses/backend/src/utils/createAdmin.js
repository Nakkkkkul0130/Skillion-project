const User = require('../models/User');

const createDefaultAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    
    const existingAdmin = await User.findOne({ email: adminEmail });
    
    if (!existingAdmin) {
      const admin = new User({
        name: 'Admin',
        email: adminEmail,
        password: adminPassword,
        role: 'admin'
      });
      
      await admin.save();
      console.log(`Default admin created: ${adminEmail}`);
    }
  } catch (error) {
    console.error('Error creating default admin:', error);
  }
};

module.exports = { createDefaultAdmin };
import app from './app';
import { connectDB } from './config/db';
import { createAdminUser } from './services/userService';

// const PORT = process.env.PORT || 5000;

const PORT = 5002;

connectDB().then(() => {
  app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    
    // Create admin user if it doesn't exist
    try {
      const admin = await createAdminUser();
      if (admin) {
        console.log('Admin user created/verified:', admin.email);
      }
    } catch (error) {
      console.error('Error creating admin user:', error);
    }
  });
}); 
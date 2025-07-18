import User, { IUser } from '../models/User';
import crypto from 'crypto';

export async function createUser(user: { name: string; email: string; password: string; role?: string }): Promise<IUser> {
  const verificationToken = crypto.randomBytes(32).toString('hex');
  const newUser = new User({ ...user, role: user.role || 'user', isVerified: false, verificationToken });
  return await newUser.save();
}

export async function getUser(id: string): Promise<IUser | null> {
  return await User.findById(id).select('-password');
}

export async function updateUser(id: string, data: { name: string; email: string; role?: string }): Promise<IUser | null> {
  return await User.findByIdAndUpdate(id, data, { new: true }).select('-password');
}

export async function deleteUser(id: string): Promise<boolean> {
  const result = await User.findByIdAndDelete(id);
  return !!result;
}

export async function findByEmail(email: string): Promise<IUser | null> {
  return await User.findOne({ email }).select('+password');
}

export async function listUsers(): Promise<IUser[]> {
  return await User.find().select('-password');
}

export async function verifyUser(token: string): Promise<IUser | null> {
  const user = await User.findOne({ verificationToken: token });
  if (!user) return null;
  user.isVerified = true;
  user.verificationToken = null;
  await user.save();
  return user;
}

export async function generatePasswordResetToken(email: string): Promise<IUser | null> {
  const user = await User.findOne({ email });
  if (!user) return null;
  const token = crypto.randomBytes(32).toString('hex');
  user.resetPasswordToken = token;
  user.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
  await user.save();
  return user;
}

export async function resetPassword(token: string, newPassword: string): Promise<IUser | null> {
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: new Date() },
  });
  if (!user) return null;
  user.password = newPassword;
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;
  await user.save();
  return user;
} 
import User, { IUser } from '../models/User';

export async function createUser(user: { name: string; email: string; password: string; role?: string }): Promise<IUser> {
  const newUser = new User({ ...user, role: user.role || 'user' });
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
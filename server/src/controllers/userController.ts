import { Request, Response } from 'express';
import { createUser, getUser, updateUser, deleteUser, findByEmail, listUsers, verifyUser, generatePasswordResetToken, resetPassword } from '../services/userService';
import { sendVerificationEmail, sendPasswordResetEmail } from '../utils/mailer';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

function isAdmin(req: Request): boolean {
    return (req as any).user && (req as any).user.role === 'admin';
}

class UserController {
    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const { name, email, password, role } = req.body;
            const user = await createUser({ name, email, password, role });
            // Премахваме изпращането на имейл за верификация
            // await sendVerificationEmail(user.email, user.verificationToken!);
            res.status(201).json({ id: user._id, name: user.name, email: user.email, role: user.role, message: 'Registration successful! You can now log in.' });
        } catch (error) {
            res.status(400).json({ message: 'Error creating user', error });
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            const user = await findByEmail(email);
            if (!user) {
                res.status(401).json({ message: 'Invalid credentials' });
                return;
            }
            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                res.status(401).json({ message: 'Invalid credentials' });
                return;
            }
            const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
            res.json({ 
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    avatarUrl: user.avatarUrl
                }
            });
        } catch (error) {
            res.status(400).json({ message: 'Error logging in', error });
        }
    }

    async getUser(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const user = await getUser(id);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(400).json({ message: 'Error fetching user', error });
        }
    }

    async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { name, email, role } = req.body;
            const user = await updateUser(id, { name, email, role });
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(400).json({ message: 'Error updating user', error });
        }
    }

    async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const deleted = await deleteUser(id);
            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(400).json({ message: 'Error deleting user', error });
        }
    }

    async listUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await listUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(400).json({ message: 'Error fetching users', error });
        }
    }

    async updateOwnProfile(req: Request, res: Response): Promise<void> {
        try {
            const userId = (req as any).user.userId;
            const { name, email, password } = req.body;
            const updateData: any = {};
            if (name) updateData.name = name;
            if (email) updateData.email = email;
            if (password) updateData.password = password;
            const user = await updateUser(userId, updateData);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(400).json({ message: 'Error updating profile', error });
        }
    }

    async verifyEmail(req: Request, res: Response): Promise<void> {
        try {
            const { token } = req.query;
            if (!token || typeof token !== 'string') {
                res.status(400).json({ message: 'Invalid or missing token' });
                return;
            }
            const user = await verifyUser(token);
            if (!user) {
                res.status(400).json({ message: 'Invalid or expired token' });
                return;
            }
            res.status(200).json({ message: 'Email verified successfully!' });
        } catch (error) {
            res.status(400).json({ message: 'Error verifying email', error });
        }
    }

    async requestPasswordReset(req: Request, res: Response): Promise<void> {
        try {
            const { email } = req.body;
            const user = await generatePasswordResetToken(email);
            if (user) {
                await sendPasswordResetEmail(user.email, user.resetPasswordToken!);
            }
            // Always return success to prevent email enumeration
            res.status(200).json({ message: 'If an account with that email exists, a password reset link has been sent.' });
        } catch (error) {
            res.status(400).json({ message: 'Error requesting password reset', error });
        }
    }

    async resetPassword(req: Request, res: Response): Promise<void> {
        try {
            const { token, password } = req.body;
            if (!token || !password) {
                res.status(400).json({ message: 'Token and new password are required.' });
                return;
            }
            const user = await resetPassword(token, password);
            if (!user) {
                res.status(400).json({ message: 'Invalid or expired token.' });
                return;
            }
            res.status(200).json({ message: 'Password has been reset successfully.' });
        } catch (error) {
            res.status(400).json({ message: 'Error resetting password', error });
        }
    }
}

export default UserController;
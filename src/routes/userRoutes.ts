import { Router, Request, Response, NextFunction } from 'express';
import UserController from '../controllers/userController';
import { validateUser } from '../middleware/validateUser';
import { authenticateJWT, requireAdmin } from '../middleware/auth';

const router = Router();
const userController = new UserController();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegister'
 *     responses:
 *       201:
 *         description: User registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Error creating user
 *
 * /auth/login:
 *   post:
 *     summary: Login and get a JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 */
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *               - email
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       204:
 *         description: User deleted
 *       404:
 *         description: User not found
 */

export function setUserRoutes(app: Router) {
    app.post('/auth/register', validateUser, (req: Request, res: Response, next: NextFunction) => userController.createUser(req, res).catch(next));
    app.post('/auth/login', (req: Request, res: Response, next: NextFunction) => userController.login(req, res).catch(next));
    app.get('/users', authenticateJWT, requireAdmin, (req: Request, res: Response, next: NextFunction) => userController.listUsers(req, res).catch(next));
    app.patch('/users/me', authenticateJWT, (req: Request, res: Response, next: NextFunction) => userController.updateOwnProfile(req, res).catch(next));
    app.post('/users', authenticateJWT, requireAdmin, validateUser, (req: Request, res: Response, next: NextFunction) => userController.createUser(req, res).catch(next));
    app.get('/users/:id', authenticateJWT, (req: Request, res: Response, next: NextFunction) => userController.getUser(req, res).catch(next));
    app.put('/users/:id', authenticateJWT, requireAdmin, validateUser, (req: Request, res: Response, next: NextFunction) => userController.updateUser(req, res).catch(next));
    app.delete('/users/:id', authenticateJWT, requireAdmin, (req: Request, res: Response, next: NextFunction) => userController.deleteUser(req, res).catch(next));
    app.get('/auth/verify', (req: Request, res: Response, next: NextFunction) => userController.verifyEmail(req, res).catch(next));
    app.post('/auth/request-password-reset', (req: Request, res: Response, next: NextFunction) => userController.requestPasswordReset(req, res).catch(next));
    app.post('/auth/reset-password', (req: Request, res: Response, next: NextFunction) => userController.resetPassword(req, res).catch(next));
}
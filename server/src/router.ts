import { Router } from 'express';
import plantactions from './modules/plants/plantActions';
import userActions from './modules/users/userActions';
import { authenticateToken } from './middlewares/authMiddleware'; // ✅ Middleware JWT

const router = Router();

// 🌿 Routes des plantes
router.get('/plants', plantactions.browse);
router.get('/plants/:id', plantactions.read);

// 👤 Routes utilisateur (auth)
router.post('/signup', userActions.signup);
router.post('/login', userActions.login);
router.post('/logout', userActions.logout); // ✅ Route de déconnexion
router.get('/me', authenticateToken, userActions.getAccount); // ✅ Route protégée par JWT

export default router;
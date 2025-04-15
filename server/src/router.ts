import { Router } from 'express';
import plantactions from './modules/plants/plantActions';
import userActions from './modules/users/userActions';
import { authenticateToken } from './middlewares/authMiddleware'; // ✅ Middleware JWT
import favoriteActions from './modules/favorites/favoriteActions'; // ✅ Actions des favoris
import orderActions from './modules/orders/orderActions'; // ✅ Actions des commandes

const router = Router();

// 🌿 Routes des plantes
router.get('/plants', plantactions.browse);
router.get('/plants/:id', plantactions.read);
router.get('/favorites', authenticateToken, favoriteActions.getFavorites); // ✅ Route protégée par JWT
// 👤 Routes utilisateur (auth)
router.post('/signup', userActions.signup);
router.post('/login', userActions.login);
router.post('/logout', userActions.logout); // ✅ Route de déconnexion
router.get('/me', authenticateToken, userActions.getAccount); // ✅ Route protégée par JWT
router.put('/user/profile', authenticateToken, userActions.updateProfile);
router.post("/user/change-password", authenticateToken, userActions.changePassword);
// 🛒 Routes des commandes (achats)
router.post('/orders', authenticateToken, orderActions.placeOrder); // ✅ création d'une commande
router.get('/orders', authenticateToken, orderActions.getOrders);    // ✅ historique des commandes

export default router;
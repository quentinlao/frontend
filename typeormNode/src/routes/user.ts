import { Router } from 'express';
import UserController from '../controllers/UserController';
import { checkJwt } from '../middlewares/checkJwt';
import { checkRole } from '../middlewares/checkRole';

const router = Router();

// GET public contents
router.get('/all', UserController.all);

// GET all users
router.get(
    '/users',
    [checkJwt, checkRole(['MOD', 'ADMIN', 'USER'])],
    UserController.listAll
);

// Get one user
router.get(
    '/:id([0-9]+)',
    [checkJwt, checkRole(['ADMIN'])],
    UserController.getOneById
);

//Create a new user
router.post('/', UserController.newUser);

//Edit one user
router.patch(
    '/:id([0-9]+)',
    [checkJwt, checkRole(['ADMIN'])],
    UserController.editUser
);
// GET admin
router.get('/admin', [checkJwt, checkRole(['ADMIN'])], UserController.admin);

//Delete one user
router.delete(
    '/:id([0-9]+)',
    [checkJwt, checkRole(['ADMIN'])],
    UserController.deleteUser
);

export default router;

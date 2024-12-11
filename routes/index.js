/* eslint-disable */
import { Router } from 'express';
import AppController from '../controllers/AppController';
import AuthController from '../controllers/AuthController';
import UsersController from '../controllers/UsersController';
import FilesController from '../controllers/FilesController';

const router = Router();

// AppController endpoint definitions
router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);

// users
router.post('/users', UsersController.postNew);
router.get('/users/me', UserController.getMe);


// auth
router.get('/connect', AuthController.getConnect);
router.get('/disconnect', AuthController.getDisconnect);



// files
router.post('/files', FilesController.postUpload);

export default router;

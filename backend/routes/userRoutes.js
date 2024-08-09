import express from 'express';
import { controller } from '../controllers/userController.js';
import { validarParametrosRegistros } from '../middlewares/validarParametrosRegistros.js';
const router = express.Router()

router.get('/', controller.home)

router.post('/usuarios', validarParametrosRegistros, controller.registro)

router.post('/login', controller.login)

router.get('/profile', controller.buscar)

router.get('*', controller.notFound)


export default router
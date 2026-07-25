import express from "express";

import {

  readUsers,

  registerUser,

  login,

  changePassword

} from "../controllers/users.controller.js";

import verifyToken from "../middleware/auth.middleware.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Obtener todos los usuarios
|--------------------------------------------------------------------------
*/

router.get(

  "/",

  verifyToken,

  readUsers

);

/*
|--------------------------------------------------------------------------
| Registrar usuario
|--------------------------------------------------------------------------
*/

router.post(

  "/register",

  registerUser

);

/*
|--------------------------------------------------------------------------
| Iniciar sesión
|--------------------------------------------------------------------------
*/

router.post(

  "/login",

  login

);

/*
|--------------------------------------------------------------------------
| Cambiar contraseña
|--------------------------------------------------------------------------
*/

router.put(

  "/password",

  verifyToken,

  changePassword

);

export default router;
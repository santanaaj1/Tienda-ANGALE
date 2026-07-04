import express from "express";

import {

  readUsers,

  registerUser,

  login

} from "../controllers/users.controller.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Obtener todos los usuarios
|--------------------------------------------------------------------------
*/

router.get(

  "/",

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

export default router;
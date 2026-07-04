import express from "express";

import {

  readFavorites,

  createFavorite,

  removeFavorite

} from "../controllers/favorites.controller.js";

import verifyToken from "../middleware/auth.middleware.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Obtener favoritos de un usuario
|--------------------------------------------------------------------------
*/

router.get(

  "/:usuario_id",

  verifyToken,

  readFavorites

);

/*
|--------------------------------------------------------------------------
| Agregar favorito
|--------------------------------------------------------------------------
*/

router.post(

  "/",

  verifyToken,

  createFavorite

);

/*
|--------------------------------------------------------------------------
| Eliminar favorito
|--------------------------------------------------------------------------
*/

router.delete(

  "/:id",

  verifyToken,

  removeFavorite

);

export default router;
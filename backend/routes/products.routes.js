import express from "express";

import {

  readProducts,

  readProductById,

  addProduct,

  editProduct,

  removeProduct

} from "../controllers/products.controller.js";

import verifyToken from "../middleware/auth.middleware.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Obtener todos los productos
|--------------------------------------------------------------------------
*/

router.get(

  "/",

  readProducts

);

/*
|--------------------------------------------------------------------------
| Obtener producto por ID
|--------------------------------------------------------------------------
*/

router.get(

  "/:id",

  readProductById

);

/*
|--------------------------------------------------------------------------
| Crear producto
|--------------------------------------------------------------------------
*/

router.post(

  "/",

  verifyToken,

  addProduct

);

/*
|--------------------------------------------------------------------------
| Actualizar producto
|--------------------------------------------------------------------------
*/

router.put(

  "/:id",

  verifyToken,

  editProduct

);

/*
|--------------------------------------------------------------------------
| Eliminar producto
|--------------------------------------------------------------------------
*/

router.delete(

  "/:id",

  verifyToken,

  removeProduct

);

export default router;
import express from "express";

import {

  readOrders,

  readOrderById,

  addOrder,

  removeOrder

} from "../controllers/orders.controller.js";

import verifyToken from "../middleware/auth.middleware.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Obtener pedidos del usuario
|--------------------------------------------------------------------------
*/

router.get(

  "/",

  verifyToken,

  readOrders

);

/*
|--------------------------------------------------------------------------
| Obtener un pedido por ID
|--------------------------------------------------------------------------
*/

router.get(

  "/:id",

  verifyToken,

  readOrderById

);

/*
|--------------------------------------------------------------------------
| Crear pedido
|--------------------------------------------------------------------------
*/

router.post(

  "/",

  verifyToken,

  addOrder

);

/*
|--------------------------------------------------------------------------
| Eliminar pedido
|--------------------------------------------------------------------------
*/

router.delete(

  "/:id",

  verifyToken,

  removeOrder

);

export default router;
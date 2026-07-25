import express from "express";

import {

  readBrands,
  readBrandById

} from "../controllers/brands.controller.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Obtener todas las marcas
|--------------------------------------------------------------------------
*/

router.get(

  "/",

  readBrands

);

/*
|--------------------------------------------------------------------------
| Obtener marca por ID
|--------------------------------------------------------------------------
*/

router.get(

  "/:id",

  readBrandById

);

export default router;
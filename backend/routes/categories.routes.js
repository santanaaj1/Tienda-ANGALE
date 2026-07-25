import express from "express";

import {

  readCategories,

  readCategoryById

} from "../controllers/categories.controller.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Obtener todas las categorías
|--------------------------------------------------------------------------
*/

router.get(

  "/",

  readCategories

);

/*
|--------------------------------------------------------------------------
| Obtener categoría por ID
|--------------------------------------------------------------------------
*/

router.get(

  "/:id",

  readCategoryById

);

export default router;
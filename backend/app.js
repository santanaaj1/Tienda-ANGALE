import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import productsRoutes from "./routes/products.routes.js";
import categoriesRoutes from "./routes/categories.routes.js";
import brandsRoutes from "./routes/brands.routes.js";
import usersRoutes from "./routes/users.routes.js";
import favoritesRoutes from "./routes/favorites.routes.js";
import ordersRoutes from "./routes/orders.routes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());

app.use(express.json());

/*
|--------------------------------------------------------------------------
| Archivos estáticos
|--------------------------------------------------------------------------
*/

app.use("/images", express.static(path.join(__dirname, "public/images")));

/*
|--------------------------------------------------------------------------
| Rutas de la API
|--------------------------------------------------------------------------
*/

app.use("/products", productsRoutes);
app.use("/categories", categoriesRoutes);
app.use("/brands", brandsRoutes);
app.use("/users", usersRoutes);
app.use("/favorites", favoritesRoutes);
app.use("/orders", ordersRoutes);

/*
|--------------------------------------------------------------------------
| Ruta principal
|--------------------------------------------------------------------------
*/

app.get("/", (request, response) => {

  response.json({

    mensaje: "Backend ANGALE funcionando"

  });

});

export default app;
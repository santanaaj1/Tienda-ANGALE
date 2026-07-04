import express from "express";
import cors from "cors";

import productsRoutes from "./routes/products.routes.js";
import usersRoutes from "./routes/users.routes.js";
import favoritesRoutes from "./routes/favorites.routes.js";
import ordersRoutes from "./routes/orders.routes.js";

const app = express();

app.use(cors());

app.use(express.json());

/*
|--------------------------------------------------------------------------
| Rutas de la API
|--------------------------------------------------------------------------
*/

app.use("/products", productsRoutes);
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
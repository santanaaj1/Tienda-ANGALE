import request from "supertest";
import app from "../app.js";

/*
|--------------------------------------------------------------------------
| Tests API ANGALE Store
|--------------------------------------------------------------------------
*/

describe("API ANGALE Store", () => {

  /*
  |--------------------------------------------------------------------------
  | Productos
  |--------------------------------------------------------------------------
  */

  test("GET /products debe responder con status 200", async () => {

    const response = await request(app)

      .get("/products");

    expect(response.statusCode).toBe(200);

    expect(Array.isArray(response.body)).toBe(true);

  });

  test("GET /products/:id inexistente debe responder 404", async () => {

    const response = await request(app)

      .get("/products/999999");

    expect(response.statusCode).toBe(404);

  });

  /*
  |--------------------------------------------------------------------------
  | Login
  |--------------------------------------------------------------------------
  */

  test("POST /users/login debe responder 200 y devolver un token", async () => {

    const response = await request(app)

      .post("/users/login")

      .send({

        email: "alejandro2@email.com",

        password: "123456"

      });

    expect(response.statusCode).toBe(200);

    expect(response.body.token).toBeDefined();

  });

  /*
  |--------------------------------------------------------------------------
  | Middleware JWT
  |--------------------------------------------------------------------------
  */

  test("GET /favorites/:usuario_id sin token debe responder 401", async () => {

    const response = await request(app)

      .get("/favorites/3");

    expect(response.statusCode).toBe(401);

  });

});

import pool from "../database/connection.js";

afterAll(async () => {

  await pool.end();

});
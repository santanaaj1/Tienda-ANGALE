import pool from "../database/connection.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/*
|--------------------------------------------------------------------------
| Obtener todos los usuarios
|--------------------------------------------------------------------------
*/

const getUsers = async () => {

  const query = `

    SELECT

      id,
      nombre,
      apellido,
      email,
      rol

    FROM usuarios

    ORDER BY id;

  `;

  const result = await pool.query(query);

  return result.rows;

};

/*
|--------------------------------------------------------------------------
| Registrar usuario
|--------------------------------------------------------------------------
*/

const createUser = async (user) => {

  const {

    nombre,
    apellido,
    email,
    password,
    rol

  } = user;

  const encryptedPassword = await bcrypt.hash(password, 10);

  const query = `

    INSERT INTO usuarios

    (

      nombre,
      apellido,
      email,
      password,
      rol

    )

    VALUES

    (

      $1,$2,$3,$4,$5

    )

    RETURNING

      id,
      nombre,
      apellido,
      email,
      rol;

  `;

  const values = [

    nombre,
    apellido,
    email,
    encryptedPassword,
    rol || "cliente"

  ];

  const result = await pool.query(query, values);

  return result.rows[0];

};

/*
|--------------------------------------------------------------------------
| Iniciar sesión
|--------------------------------------------------------------------------
*/

const loginUser = async (email, password) => {

  const query = `

    SELECT *

    FROM usuarios

    WHERE email = $1;

  `;

  const result = await pool.query(

    query,

    [email]

  );

  if (result.rowCount === 0) {

    throw new Error(

      "Usuario no encontrado"

    );

  }

  const user = result.rows[0];

  const validPassword = await bcrypt.compare(

    password,

    user.password

  );

  if (!validPassword) {

    throw new Error(

      "Contraseña incorrecta"

    );

  }

  const token = jwt.sign(

    {

      id: user.id,

      email: user.email,

      rol: user.rol

    },

    process.env.JWT_SECRET,

    {

      expiresIn: "1h"

    }

  );

  return {

    token,

    usuario: {

      id: user.id,

      nombre: user.nombre,

      apellido: user.apellido,

      email: user.email,

      rol: user.rol

    }

  };

};

export {

  getUsers,

  createUser,

  loginUser

};
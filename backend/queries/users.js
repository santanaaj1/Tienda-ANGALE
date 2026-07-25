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

  const encryptedPassword = await bcrypt.hash(

    password,

    10

  );

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

  try {

    const result = await pool.query(

      query,

      values

    );

    return result.rows[0];

  }

  catch (error) {

    /*
    |--------------------------------------------------------------------------
    | Correo duplicado
    |--------------------------------------------------------------------------
    */

    if (

      error.code === "23505"

    ) {

      throw new Error(

        "El correo electrónico ya se encuentra registrado."

      );

    }

    throw error;

  }

};

/*
|--------------------------------------------------------------------------
| Iniciar sesión
|--------------------------------------------------------------------------
*/

const loginUser = async (

  email,

  password

) => {

  const query = `

    SELECT *

    FROM usuarios

    WHERE email = $1;

  `;

  const result = await pool.query(

    query,

    [

      email

    ]

  );

  if (

    result.rowCount === 0

  ) {

    throw new Error(

      "Usuario no encontrado"

    );

  }

  const user = result.rows[0];

  const validPassword = await bcrypt.compare(

    password,

    user.password

  );

  if (

    !validPassword

  ) {

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

/*
|--------------------------------------------------------------------------
| Cambiar contraseña
|--------------------------------------------------------------------------
*/

const updatePassword = async (

  userId,

  currentPassword,

  newPassword

) => {

  const query = `

    SELECT *

    FROM usuarios

    WHERE id = $1;

  `;

  const result = await pool.query(

    query,

    [

      userId

    ]

  );

  if (

    result.rowCount === 0

  ) {

    throw new Error(

      "Usuario no encontrado"

    );

  }

  const user = result.rows[0];

  const validPassword = await bcrypt.compare(

    currentPassword,

    user.password

  );

  if (

    !validPassword

  ) {

    throw new Error(

      "La contraseña actual es incorrecta"

    );

  }

  const encryptedPassword = await bcrypt.hash(

    newPassword,

    10

  );

  await pool.query(

    `

      UPDATE usuarios

      SET password = $1

      WHERE id = $2;

    `,

    [

      encryptedPassword,

      userId

    ]

  );

  return {

    message:

      "Contraseña actualizada correctamente"

  };

};

export {

  getUsers,

  createUser,

  loginUser,

  updatePassword

};
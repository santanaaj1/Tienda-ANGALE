import pool from "../database/connection.js";

/*
|--------------------------------------------------------------------------
| Obtener favoritos de un usuario
|--------------------------------------------------------------------------
*/

const getFavorites = async (usuario_id) => {

  const query = `

    SELECT

      favoritos.id,

      productos.id AS producto_id,

      productos.nombre,

      productos.descripcion,

      productos.precio,

      productos.marca,

      productos.categoria,

      productos.stock,

      productos.icono,

      productos.image

    FROM favoritos

    INNER JOIN productos

      ON favoritos.producto_id = productos.id

    WHERE favoritos.usuario_id = $1

    ORDER BY favoritos.id;

  `;

  const result = await pool.query(

    query,

    [usuario_id]

  );

  return result.rows;

};

/*
|--------------------------------------------------------------------------
| Agregar favorito
|--------------------------------------------------------------------------
*/

const addFavorite = async (

  usuario_id,

  producto_id

) => {

  /*
  |--------------------------------------------------------------------------
  | Verificar si ya existe
  |--------------------------------------------------------------------------
  */

  const existsQuery = `

    SELECT *

    FROM favoritos

    WHERE usuario_id = $1

    AND producto_id = $2;

  `;

  const exists = await pool.query(

    existsQuery,

    [

      usuario_id,

      producto_id

    ]

  );

  if (

    exists.rows.length > 0

  ) {

    return {

      alreadyExists: true,

      favorite: exists.rows[0]

    };

  }

  /*
  |--------------------------------------------------------------------------
  | Insertar favorito
  |--------------------------------------------------------------------------
  */

  const query = `

    INSERT INTO favoritos

    (

      usuario_id,

      producto_id

    )

    VALUES

    (

      $1,

      $2

    )

    RETURNING *;

  `;

  const result = await pool.query(

    query,

    [

      usuario_id,

      producto_id

    ]

  );

  return {

    alreadyExists: false,

    favorite: result.rows[0]

  };

};

/*
|--------------------------------------------------------------------------
| Eliminar favorito
|--------------------------------------------------------------------------
*/

const deleteFavorite = async (

  id,

  usuario_id

) => {

  const query = `

    DELETE

    FROM favoritos

    WHERE id = $1

    AND usuario_id = $2

    RETURNING *;

  `;

  const result = await pool.query(

    query,

    [

      id,

      usuario_id

    ]

  );

  return result.rows[0];

};

export {

  getFavorites,

  addFavorite,

  deleteFavorite

};
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

      productos.icono

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

const addFavorite = async (usuario_id, producto_id) => {

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

  return result.rows[0];

};

/*
|--------------------------------------------------------------------------
| Eliminar favorito
|--------------------------------------------------------------------------
*/

const deleteFavorite = async (id) => {

  const query = `

    DELETE FROM favoritos

    WHERE id = $1

    RETURNING *;

  `;

  const result = await pool.query(

    query,

    [id]

  );

  return result.rows[0];

};

export {

  getFavorites,

  addFavorite,

  deleteFavorite

};
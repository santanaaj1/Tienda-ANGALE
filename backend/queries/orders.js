import pool from "../database/connection.js";

/*
|--------------------------------------------------------------------------
| Obtener pedidos
|--------------------------------------------------------------------------
*/

const getOrders = async (usuario_id = null) => {

  /*
  |--------------------------------------------------------------------------
  | Administrador: obtiene todos los pedidos
  |--------------------------------------------------------------------------
  */

  if (!usuario_id) {

    const query = `

      SELECT

        pedidos.id,
        pedidos.fecha,
        pedidos.total,
        usuarios.nombre,
        usuarios.apellido,
        usuarios.email

      FROM pedidos

      INNER JOIN usuarios
        ON pedidos.usuario_id = usuarios.id

      ORDER BY pedidos.fecha DESC;

    `;

    const result = await pool.query(query);

    return result.rows;

  }

  /*
  |--------------------------------------------------------------------------
  | Cliente: obtiene únicamente sus pedidos
  |--------------------------------------------------------------------------
  */

  const query = `

    SELECT

      id,
      fecha,
      total

    FROM pedidos

    WHERE usuario_id = $1

    ORDER BY fecha DESC;

  `;

  const result = await pool.query(

    query,

    [usuario_id]

  );

  return result.rows;

};

/*
|--------------------------------------------------------------------------
| Obtener detalle de un pedido
|--------------------------------------------------------------------------
*/

const getOrderById = async (

  id,

  usuario_id = null

) => {

  /*
  |--------------------------------------------------------------------------
  | Administrador
  |--------------------------------------------------------------------------
  */

  if (!usuario_id) {

    const query = `

      SELECT

        pedidos.id,
        pedidos.fecha,
        pedidos.total,
        detalle_pedido.producto_id,
        productos.nombre,
        detalle_pedido.cantidad,
        detalle_pedido.precio

      FROM pedidos

      INNER JOIN detalle_pedido
        ON pedidos.id = detalle_pedido.pedido_id

      INNER JOIN productos
        ON detalle_pedido.producto_id = productos.id

      WHERE pedidos.id = $1;

    `;

    const result = await pool.query(

      query,

      [id]

    );

    return result.rows;

  }

  /*
  |--------------------------------------------------------------------------
  | Cliente
  |--------------------------------------------------------------------------
  */

  const query = `

    SELECT

      pedidos.id,
      pedidos.fecha,
      pedidos.total,
      detalle_pedido.producto_id,
      productos.nombre,
      detalle_pedido.cantidad,
      detalle_pedido.precio

    FROM pedidos

    INNER JOIN detalle_pedido
      ON pedidos.id = detalle_pedido.pedido_id

    INNER JOIN productos
      ON detalle_pedido.producto_id = productos.id

    WHERE pedidos.id = $1
      AND pedidos.usuario_id = $2;

  `;

  const result = await pool.query(

    query,

    [

      id,

      usuario_id

    ]

  );

  return result.rows;

};

/*
|--------------------------------------------------------------------------
| Crear pedido
|--------------------------------------------------------------------------
*/

const createOrder = async (

  usuario_id,

  total

) => {

  const query = `

    INSERT INTO pedidos

    (

      usuario_id,

      total

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

      total

    ]

  );

  return result.rows[0];

};

/*
|--------------------------------------------------------------------------
| Agregar detalle del pedido
|--------------------------------------------------------------------------
*/

const createOrderDetail = async (

  pedido_id,

  producto_id,

  cantidad,

  precio

) => {

  const query = `

    INSERT INTO detalle_pedido

    (

      pedido_id,

      producto_id,

      cantidad,

      precio

    )

    VALUES

    (

      $1,

      $2,

      $3,

      $4

    )

    RETURNING *;

  `;

  const result = await pool.query(

    query,

    [

      pedido_id,

      producto_id,

      cantidad,

      precio

    ]

  );

  return result.rows[0];

};

/*
|--------------------------------------------------------------------------
| Eliminar pedido
|--------------------------------------------------------------------------
*/

const deleteOrder = async (

  id,

  usuario_id

) => {

  const query = `

    DELETE FROM pedidos

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

  getOrders,

  getOrderById,

  createOrder,

  createOrderDetail,

  deleteOrder

};
import pool from "../database/connection.js";
import {
  decreaseStock,
  getProductPrice
} from "./products.js";

/*
|--------------------------------------------------------------------------
| Obtener pedidos
|--------------------------------------------------------------------------
*/

const getOrders = async (usuario_id) => {

  if (!usuario_id) {

    const query = `

      SELECT

        pedidos.id,
        pedidos.fecha,
        pedidos.total,
        usuarios.email AS cliente

      FROM pedidos

      INNER JOIN usuarios
        ON pedidos.usuario_id = usuarios.id

      ORDER BY pedidos.fecha DESC;

    `;

    const result = await pool.query(query);

    return result.rows;

  }

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

  usuario_id

) => {

  const query = `

    SELECT

      pedidos.id,
      pedidos.fecha,
      pedidos.total,
      usuarios.email AS cliente,
      detalle_pedido.producto_id,
      productos.nombre,
      detalle_pedido.cantidad,
      detalle_pedido.precio

    FROM pedidos

    INNER JOIN usuarios
      ON pedidos.usuario_id = usuarios.id

    INNER JOIN detalle_pedido
      ON pedidos.id = detalle_pedido.pedido_id

    INNER JOIN productos
      ON detalle_pedido.producto_id = productos.id

    WHERE pedidos.id = $1
      AND pedidos.usuario_id = $2

    ORDER BY productos.nombre;

  `;

  const result = await pool.query(

    query,

    [

      id,

      usuario_id

    ]

  );

  if (result.rows.length === 0) {

    return null;

  }

  const firstRow = result.rows[0];

  return {

    id: firstRow.id,

    fecha: firstRow.fecha,

    cliente: firstRow.cliente,

    total: Number(firstRow.total),

    items: result.rows.map(row => ({

      id: row.producto_id,

      nombre: row.nombre,

      quantity: row.cantidad,

      precio: Number(row.precio)

    }))

  };

};

/*
|--------------------------------------------------------------------------
| Funciones internas
|--------------------------------------------------------------------------
*/

const createOrder = async (

  client,

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

  const result = await client.query(

    query,

    [

      usuario_id,

      total

    ]

  );

  return result.rows[0];

};

const createOrderDetail = async (

  client,

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

  const result = await client.query(

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
| Crear pedido completo
|--------------------------------------------------------------------------
*/

const createCompleteOrder = async (

  usuario_id,

  total,

  productos

) => {

  const client = await pool.connect();

  try {

    await client.query("BEGIN");

    let totalCalculado = 0;

    const productosProcesados = [];

    for (const producto of productos) {

      const product = await getProductPrice(

        producto.producto_id

      );

      if (!product) {

        throw new Error(

          `El producto ${producto.producto_id} no existe.`

        );

      }

      const precioReal = Number(product.precio);

      totalCalculado +=

        precioReal * producto.cantidad;

      productosProcesados.push({

        producto_id: producto.producto_id,

        cantidad: producto.cantidad,

        precio: precioReal

      });

    }

    const order = await createOrder(

      client,

      usuario_id,

      totalCalculado

    );

    for (const producto of productosProcesados) {

      await createOrderDetail(

        client,

        order.id,

        producto.producto_id,

        producto.cantidad,

        producto.precio

      );

      const updatedProduct = await decreaseStock(

        producto.producto_id,

        producto.cantidad,

        client

      );

      if (!updatedProduct) {

        throw new Error(

          `Stock insuficiente para el producto ${producto.producto_id}`

        );

      }

    }

    await client.query("COMMIT");

    return order;

  }

  catch (error) {

    await client.query("ROLLBACK");

    throw error;

  }

  finally {

    client.release();

  }

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

  createCompleteOrder,

  deleteOrder

};
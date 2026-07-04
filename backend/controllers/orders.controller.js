import {

  getOrders,

  getOrderById,

  createOrder,

  createOrderDetail,

  deleteOrder

} from "../queries/orders.js";

/*
|--------------------------------------------------------------------------
| Obtener pedidos del usuario
|--------------------------------------------------------------------------
*/

const readOrders = async (request, response) => {

  try {

    const { usuario_id } = request.query;

    const orders = await getOrders(

      usuario_id

    );

    response.status(200).json(

      orders

    );

  }

  catch (error) {

    console.error(error);

    response.status(500).json({

      message: "Error al obtener los pedidos"

    });

  }

};

/*
|--------------------------------------------------------------------------
| Obtener detalle de un pedido
|--------------------------------------------------------------------------
*/

const readOrderById = async (request, response) => {

  try {

    const { id } = request.params;

    const { usuario_id } = request.query;

    const order = await getOrderById(

      id,

      usuario_id

    );

    response.status(200).json(

      order

    );

  }

  catch (error) {

    console.error(error);

    response.status(500).json({

      message: "Error al obtener el pedido"

    });

  }

};

/*
|--------------------------------------------------------------------------
| Crear pedido
|--------------------------------------------------------------------------
*/

const addOrder = async (request, response) => {

  try {

    console.log(request.body);

    const {

      usuario_id,

      total,

      productos

    } = request.body;

    const order = await createOrder(

      usuario_id,

      total

    );

    for (const producto of productos) {

      await createOrderDetail(

        order.id,

        producto.producto_id,

        producto.cantidad,

        producto.precio

      );

    }

    response.status(201).json(order);

  }

  catch (error) {

    console.error(error);

    response.status(500).json({

      message: "Error al crear el pedido"

    });

  }

};

/*
|--------------------------------------------------------------------------
| Eliminar pedido
|--------------------------------------------------------------------------
*/

const removeOrder = async (request, response) => {

  try {

    const { id } = request.params;

    const { usuario_id } = request.query;

    await deleteOrder(

      id,

      usuario_id

    );

    response.status(200).json({

      message: "Pedido eliminado correctamente"

    });

  }

  catch (error) {

    console.error(error);

    response.status(500).json({

      message: "Error al eliminar el pedido"

    });

  }

};

export {

  readOrders,

  readOrderById,

  addOrder,

  removeOrder

};
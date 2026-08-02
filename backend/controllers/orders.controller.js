import {

  getOrders,

  getOrderById,

  createOrder,

  createOrderDetail,

  deleteOrder

} from "../queries/orders.js";

/*
|--------------------------------------------------------------------------
| Obtener pedidos
|--------------------------------------------------------------------------
*/

const readOrders = async (request, response) => {

  try {

    let orders;

    /*
    |--------------------------------------------------------------------------
    | Administrador obtiene todos los pedidos
    |--------------------------------------------------------------------------
    */

    if (request.user.rol === "admin") {

      orders = await getOrders();

    }

    /*
    |--------------------------------------------------------------------------
    | Cliente obtiene únicamente sus pedidos
    |--------------------------------------------------------------------------
    */

    else {

      orders = await getOrders(

        request.user.id

      );

    }

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

    let order;

    /*
    |--------------------------------------------------------------------------
    | Administrador puede ver cualquier pedido
    |--------------------------------------------------------------------------
    */

    if (request.user.rol === "admin") {

      order = await getOrderById(

        id

      );

    }

    /*
    |--------------------------------------------------------------------------
    | Cliente solo puede ver los suyos
    |--------------------------------------------------------------------------
    */

    else {

      order = await getOrderById(

        id,

        request.user.id

      );

    }

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

    const {

      total,

      productos

    } = request.body;

    /*
    |--------------------------------------------------------------------------
    | Crear encabezado del pedido
    |--------------------------------------------------------------------------
    */

    const order = await createOrder(

      request.user.id,

      total

    );

    /*
    |--------------------------------------------------------------------------
    | Guardar detalle
    |--------------------------------------------------------------------------
    */

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

    /*
    |--------------------------------------------------------------------------
    | El administrador puede eliminar cualquier pedido
    |--------------------------------------------------------------------------
    */

    if (request.user.rol === "admin") {

      await deleteOrder(

        id,

        null

      );

    }

    /*
    |--------------------------------------------------------------------------
    | Cliente únicamente elimina los suyos
    |--------------------------------------------------------------------------
    */

    else {

      await deleteOrder(

        id,

        request.user.id

      );

    }

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
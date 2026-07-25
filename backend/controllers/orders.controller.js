import {

  getOrders,

  getOrderById,

  createCompleteOrder,

  deleteOrder

} from "../queries/orders.js";

import {

  productExists

} from "../queries/products.js";

/*
|--------------------------------------------------------------------------
| Obtener pedidos
|--------------------------------------------------------------------------
*/

const readOrders = async (request, response) => {

  try {

    const usuario_id = request.user.id;

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

    const usuario_id = request.user.id;

    const order = await getOrderById(

      id,

      usuario_id

    );

    if (!order) {

      return response.status(404).json({

        message: "Pedido no encontrado"

      });

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

    const usuario_id = request.user.id;

    const {

      total,

      productos

    } = request.body;

    /*
    |--------------------------------------------------------------------------
    | Validación básica del pedido
    |--------------------------------------------------------------------------
    */

    if (

      !Array.isArray(productos) ||

      productos.length === 0

    ) {

      return response.status(400).json({

        message: "El pedido debe contener al menos un producto."

      });

    }

    /*
    |--------------------------------------------------------------------------
    | Validación de cada producto
    |--------------------------------------------------------------------------
    */

    for (const producto of productos) {

      if (

        producto.producto_id === undefined ||

        producto.producto_id === null ||

        !Number.isInteger(producto.producto_id)

      ) {

        return response.status(400).json({

          message: "El ID del producto es inválido."

        });

      }

      if (

        producto.cantidad === undefined ||

        producto.cantidad === null ||

        !Number.isInteger(producto.cantidad)

      ) {

        return response.status(400).json({

          message: "La cantidad del producto debe ser un número entero."

        });

      }

      if (

        producto.cantidad <= 0

      ) {

        return response.status(400).json({

          message: "La cantidad del producto debe ser mayor que cero."

        });

      }

      /*
      |--------------------------------------------------------------------------
      | Verificar que el producto exista
      |--------------------------------------------------------------------------
      */

      const exists = await productExists(

        producto.producto_id

      );

      if (!exists) {

        return response.status(400).json({

          message: `El producto con ID ${producto.producto_id} no existe.`

        });

      }

    }

    const order = await createCompleteOrder(

      usuario_id,

      total,

      productos

    );

    response.status(201).json(

      order

    );

  }

  catch (error) {

    console.error(error);

    response.status(500).json({

      message: error.message || "Error al crear el pedido"

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

    const usuario_id = request.user.id;

    const order = await deleteOrder(

      id,

      usuario_id

    );

    if (!order) {

      return response.status(404).json({

        message: "Pedido no encontrado"

      });

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
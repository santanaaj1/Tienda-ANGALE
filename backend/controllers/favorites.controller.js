import {

  getFavorites,

  addFavorite,

  deleteFavorite

} from "../queries/favorites.js";

import {

  productExists

} from "../queries/products.js";

/*
|--------------------------------------------------------------------------
| Obtener favoritos
|--------------------------------------------------------------------------
*/

const readFavorites = async (request, response) => {

  try {

    const usuario_id = request.user.id;

    const favorites = await getFavorites(

      usuario_id

    );

    response.status(200).json(

      favorites

    );

  }

  catch (error) {

    console.error(error);

    response.status(500).json({

      message: "Error al obtener favoritos"

    });

  }

};

/*
|--------------------------------------------------------------------------
| Agregar favorito
|--------------------------------------------------------------------------
*/

const createFavorite = async (request, response) => {

  try {

    const usuario_id = request.user.id;

    const {

      producto_id

    } = request.body;

    /*
    |--------------------------------------------------------------------------
    | Validaciones
    |--------------------------------------------------------------------------
    */

    if (producto_id === undefined) {

      return response.status(400).json({

        message: "El producto_id es obligatorio."

      });

    }

    if (!Number.isInteger(producto_id)) {

      return response.status(400).json({

        message: "El producto_id debe ser un número entero."

      });

    }

    if (producto_id <= 0) {

      return response.status(400).json({

        message: "El producto_id debe ser mayor que cero."

      });

    }

    /*
    |--------------------------------------------------------------------------
    | Verificar existencia del producto
    |--------------------------------------------------------------------------
    */

    const exists = await productExists(

      producto_id

    );

    if (!exists) {

      return response.status(400).json({

        message: `El producto con ID ${producto_id} no existe.`

      });

    }

    /*
    |--------------------------------------------------------------------------
    | Agregar favorito
    |--------------------------------------------------------------------------
    */

    const result = await addFavorite(

      usuario_id,

      producto_id

    );

    /*
    |--------------------------------------------------------------------------
    | El favorito ya existe
    |--------------------------------------------------------------------------
    */

    if (

      result.alreadyExists

    ) {

      return response.status(409).json({

        message: "El producto ya está en favoritos.",

        favorite: result.favorite

      });

    }

    /*
    |--------------------------------------------------------------------------
    | Favorito creado
    |--------------------------------------------------------------------------
    */

    return response.status(201).json(

      result.favorite

    );

  }

  catch (error) {

    console.error(error);

    response.status(500).json({

      message: "Error al agregar favorito"

    });

  }

};

/*
|--------------------------------------------------------------------------
| Eliminar favorito
|--------------------------------------------------------------------------
*/

const removeFavorite = async (request, response) => {

  try {

    const {

      id

    } = request.params;

    const usuario_id = request.user.id;

    const favorite = await deleteFavorite(

      id,

      usuario_id

    );

    if (!favorite) {

      return response.status(404).json({

        message: "Favorito no encontrado"

      });

    }

    response.status(200).json({

      message: "Favorito eliminado correctamente",

      favorite

    });

  }

  catch (error) {

    console.error(error);

    response.status(500).json({

      message: "Error al eliminar favorito"

    });

  }

};

export {

  readFavorites,

  createFavorite,

  removeFavorite

};
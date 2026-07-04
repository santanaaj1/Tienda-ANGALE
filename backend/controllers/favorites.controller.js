import {

  getFavorites,

  addFavorite,

  deleteFavorite

} from "../queries/favorites.js";

/*
|--------------------------------------------------------------------------
| Obtener favoritos
|--------------------------------------------------------------------------
*/

const readFavorites = async (request, response) => {

  try {

    const { usuario_id } = request.params;

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

    const {

      usuario_id,

      producto_id

    } = request.body;

    const favorite = await addFavorite(

      usuario_id,

      producto_id

    );

    response.status(201).json(

      favorite

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

    const { id } = request.params;

    const favorite = await deleteFavorite(

      id

    );

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
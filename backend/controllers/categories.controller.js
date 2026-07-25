import {

  getCategories,

  getCategoryById

} from "../queries/categories.js";

/*
|--------------------------------------------------------------------------
| Obtener todas las categorías
|--------------------------------------------------------------------------
*/

const readCategories = async (request, response) => {

  try {

    const categories = await getCategories();

    response.status(200).json(categories);

  }

  catch (error) {

    console.error(error);

    response.status(500).json({

      message: "Error al obtener las categorías"

    });

  }

};

/*
|--------------------------------------------------------------------------
| Obtener una categoría por ID
|--------------------------------------------------------------------------
*/

const readCategoryById = async (request, response) => {

  try {

    const { id } = request.params;

    const category = await getCategoryById(id);

    if (!category) {

      return response.status(404).json({

        message: "Categoría no encontrada"

      });

    }

    response.status(200).json(category);

  }

  catch (error) {

    console.error(error);

    response.status(500).json({

      message: "Error al obtener la categoría"

    });

  }

};

export {

  readCategories,

  readCategoryById

};
import {

  getBrands,
  getBrandById

} from "../queries/brands.js";

/*
|--------------------------------------------------------------------------
| Obtener todas las marcas
|--------------------------------------------------------------------------
*/

const readBrands = async (request, response) => {

  try {

    const brands = await getBrands();

    response.status(200).json(brands);

  }

  catch (error) {

    console.error(error);

    response.status(500).json({

      message: "Error al obtener las marcas"

    });

  }

};

/*
|--------------------------------------------------------------------------
| Obtener marca por ID
|--------------------------------------------------------------------------
*/

const readBrandById = async (request, response) => {

  try {

    const { id } = request.params;

    const brand = await getBrandById(id);

    if (!brand) {

      return response.status(404).json({

        message: "Marca no encontrada"

      });

    }

    response.status(200).json(brand);

  }

  catch (error) {

    console.error(error);

    response.status(500).json({

      message: "Error al obtener la marca"

    });

  }

};

export {

  readBrands,
  readBrandById

};
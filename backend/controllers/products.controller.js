import {

  getProducts,

  getProductById,

  createProduct,

  updateProduct,

  deleteProduct

} from "../queries/products.js";

/*
|--------------------------------------------------------------------------
| Obtener todos los productos
|--------------------------------------------------------------------------
*/

const readProducts = async (request, response) => {

  try {

    const products = await getProducts();

    response.status(200).json(products);

  }

  catch (error) {

    console.error(error);

    response.status(500).json({

      message: "Error al obtener los productos"

    });

  }

};

/*
|--------------------------------------------------------------------------
| Obtener un producto por ID
|--------------------------------------------------------------------------
*/

const readProductById = async (request, response) => {

  try {

    const { id } = request.params;

    const product = await getProductById(id);

    if (!product) {

      return response.status(404).json({

        message: "Producto no encontrado"

      });

    }

    response.status(200).json(product);

  }

  catch (error) {

    console.error(error);

    response.status(500).json({

      message: "Error al obtener el producto"

    });

  }

};

/*
|--------------------------------------------------------------------------
| Crear producto
|--------------------------------------------------------------------------
*/

const addProduct = async (request, response) => {

  try {

    const newProduct = await createProduct(request.body);

    response.status(201).json(newProduct);

  }

  catch (error) {

    console.error(error);

    response.status(500).json({

      message: "Error al crear el producto"

    });

  }

};

/*
|--------------------------------------------------------------------------
| Actualizar producto
|--------------------------------------------------------------------------
*/

const editProduct = async (request, response) => {

  try {

    const { id } = request.params;

    const updatedProduct = await updateProduct(

      id,

      request.body

    );

    if (!updatedProduct) {

      return response.status(404).json({

        message: "Producto no encontrado"

      });

    }

    response.status(200).json(updatedProduct);

  }

  catch (error) {

    console.error(error);

    response.status(500).json({

      message: "Error al actualizar el producto"

    });

  }

};

/*
|--------------------------------------------------------------------------
| Eliminar producto
|--------------------------------------------------------------------------
*/

const removeProduct = async (request, response) => {

  try {

    const { id } = request.params;

    const deletedProduct = await deleteProduct(id);

    if (!deletedProduct) {

      return response.status(404).json({

        message: "Producto no encontrado"

      });

    }

    response.status(200).json({

      message: "Producto eliminado correctamente",

      product: deletedProduct

    });

  }

  catch (error) {

    console.error(error);

    response.status(500).json({

      message: "Error al eliminar el producto"

    });

  }

};

export {

  readProducts,

  readProductById,

  addProduct,

  editProduct,

  removeProduct

};
import {
  createContext,
  useState,
  useEffect,
  useContext
} from "react";

import {
  getProducts,
  createProduct,
  updateProduct as updateProductService,
  deleteProduct as deleteProductService
} from "../services/productService";

import {
  NotificationContext
} from "./NotificationContext";

export const ProductContext =
  createContext();

function ProductProvider({ children }) {

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const {
    showNotification
  } = useContext(
    NotificationContext
  );

  /*
  |--------------------------------------------------------------------------
  | Obtener productos desde la API
  |--------------------------------------------------------------------------
  */

  const refreshProducts = async () => {

    try {

      const data =
        await getProducts();

      setProducts(data);

      return true;

    }

    catch (error) {

      console.error(error);

      showNotification(

        "❌ No fue posible cargar los productos.",

        "error"

      );

      return false;

    }

  };

  useEffect(() => {

    const loadProducts = async () => {

      await refreshProducts();

      setLoading(false);

    };

    loadProducts();

  }, []);

  /*
  |--------------------------------------------------------------------------
  | Agregar producto
  |--------------------------------------------------------------------------
  */

  const addProduct = async (
    newProduct
  ) => {

    try {

      await createProduct(
        newProduct
      );

      await refreshProducts();

      showNotification(

        "✅ Producto agregado correctamente.",

        "success"

      );

      return true;

    }

    catch (error) {

      console.error(error);

      showNotification(

        "❌ No fue posible agregar el producto.",

        "error"

      );

      return false;

    }

  };

  /*
  |--------------------------------------------------------------------------
  | Actualizar producto
  |--------------------------------------------------------------------------
  */

  const updateProduct = async (
    updatedProduct
  ) => {

    try {

      await updateProductService(

        updatedProduct.id,

        updatedProduct

      );

      await refreshProducts();

      showNotification(

        "✅ Producto actualizado correctamente.",

        "success"

      );

      return true;

    }

    catch (error) {

      console.error(error);

      showNotification(

        "❌ No fue posible actualizar el producto.",

        "error"

      );

      return false;

    }

  };

  /*
  |--------------------------------------------------------------------------
  | Eliminar producto
  |--------------------------------------------------------------------------
  */

  const deleteProduct = async (
    id
  ) => {

    try {

      await deleteProductService(id);

      await refreshProducts();

      showNotification(

        "🗑 Producto eliminado correctamente.",

        "success"

      );

      return true;

    }

    catch (error) {

      console.error(error);

      showNotification(

        "❌ No fue posible eliminar el producto.",

        "error"

      );

      return false;

    }

  };

  /*
  |--------------------------------------------------------------------------
  | Actualizar stock
  |--------------------------------------------------------------------------
  */

  const updateStock = (
    productId,
    quantity
  ) => {

    const product =
      products.find(

        product =>

          product.id === productId

      );

    if (!product) {

      return false;

    }

    if (product.stock < quantity) {

      return false;

    }

    setProducts(previous =>

      previous.map(product =>

        product.id === productId

          ? {

              ...product,

              stock:

                product.stock - quantity

            }

          : product

      )

    );

    return true;

  };

  return (

    <ProductContext.Provider

      value={{

        products,

        loading,

        addProduct,

        updateProduct,

        deleteProduct,

        updateStock,

        refreshProducts

      }}

    >

      {children}

    </ProductContext.Provider>

  );

}

export default ProductProvider;
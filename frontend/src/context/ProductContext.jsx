import {
  createContext,
  useState,
  useEffect
} from "react";

import initialProducts from "../data/products";

export const ProductContext =
  createContext();

function ProductProvider({ children }) {

  const [products, setProducts] =
    useState([]);

  // Inicializar productos
  useEffect(() => {

    const savedProducts = JSON.parse(

      localStorage.getItem(

        "products"

      )

    );

    const validProducts =

      savedProducts &&

      Array.isArray(savedProducts) &&

      savedProducts.length > 0 &&

      savedProducts.every(

        product =>

          product.nombre &&
          product.descripcion &&
          product.precio &&
          product.categoria &&
          product.stock !== undefined

      );

    if (validProducts) {

      setProducts(savedProducts);

    } else {

      setProducts(initialProducts);

      localStorage.setItem(

        "products",

        JSON.stringify(

          initialProducts

        )

      );

    }

  }, []);

  // Guardar automáticamente
  useEffect(() => {

    if (products.length > 0) {

      localStorage.setItem(

        "products",

        JSON.stringify(

          products

        )

      );

    }

  }, [products]);

  // Agregar producto
  const addProduct = (

    newProduct

  ) => {

    setProducts(previous => [

      ...previous,

      newProduct

    ]);

  };

  // Actualizar producto
  const updateProduct = (

    updatedProduct

  ) => {

    setProducts(previous =>

      previous.map(

        product =>

          product.id === updatedProduct.id

            ? updatedProduct

            : product

      )

    );

  };

  // Eliminar producto
  const deleteProduct = (

    id

  ) => {

    setProducts(previous =>

      previous.filter(

        product =>

          product.id !== id

      )

    );

  };

  // Descontar stock
  const updateStock = (

    productId,

    quantity

  ) => {

    const product = products.find(

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

        addProduct,

        updateProduct,

        deleteProduct,

        updateStock

      }}

    >

      {children}

    </ProductContext.Provider>

  );

}

export default ProductProvider;
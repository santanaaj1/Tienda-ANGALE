import {
  createContext,
  useState,
  useContext,
  useEffect
} from "react";

import { NotificationContext } from "./NotificationContext";
import { AuthContext } from "./AuthContext";

export const CartContext =
  createContext();

function CartProvider({ children }) {

  const [cartItems, setCartItems] =
    useState([]);

  const { showNotification } =
    useContext(NotificationContext);

  const { currentUser } =
    useContext(AuthContext);

  // Cargar carrito del usuario actual
  useEffect(() => {

    if (!currentUser) {

      setCartItems([]);

      return;

    }

    const savedCart = JSON.parse(

      localStorage.getItem(

        `cart_${currentUser.email}`

      )

    ) || [];

    setCartItems(savedCart);

  }, [currentUser]);

  // Guardar carrito automáticamente
  useEffect(() => {

    if (!currentUser) {

      return;

    }

    localStorage.setItem(

      `cart_${currentUser.email}`,

      JSON.stringify(cartItems)

    );

  }, [cartItems, currentUser]);

  // Agregar producto
  const addToCart = (
    product,
    quantity = 1
  ) => {

    const existingProduct =
      cartItems.find(
        item => item.id === product.id
      );

    if (existingProduct) {

      setCartItems(

        cartItems.map(item =>

          item.id === product.id

            ? {

                ...item,

                quantity:
                  item.quantity + quantity

              }

            : item

        )

      );

    } else {

      setCartItems([

        ...cartItems,

        {

          ...product,

          quantity

        }

      ]);

    }

    showNotification(

      "✓ Producto agregado al carrito",

      "success"

    );

  };

  // Aumentar cantidad
  const increaseQuantity = id => {

    setCartItems(

      cartItems.map(item =>

        item.id === id

          ? {

              ...item,

              quantity:
                item.quantity + 1

            }

          : item

      )

    );

  };

  // Disminuir cantidad
  const decreaseQuantity = id => {

    setCartItems(

      cartItems.flatMap(item => {

        if (item.id !== id) {

          return item;

        }

        if (item.quantity === 1) {

          return [];

        }

        return {

          ...item,

          quantity:
            item.quantity - 1

        };

      })

    );

  };

  // Eliminar producto
  const removeFromCart = id => {

    setCartItems(

      cartItems.filter(

        item => item.id !== id

      )

    );

    showNotification(

      "🗑 Producto eliminado del carrito",

      "warning"

    );

  };

  // Vaciar carrito
  const clearCart = () => {

    setCartItems([]);

    if (currentUser) {

      localStorage.removeItem(

        `cart_${currentUser.email}`

      );

    }

  };

  // Obtener cantidad de un producto
  const getQuantityInCart = id => {

    const product =
      cartItems.find(
        item => item.id === id
      );

    return product

      ? product.quantity

      : 0;

  };

  return (

    <CartContext.Provider

      value={{

        cartItems,

        addToCart,

        increaseQuantity,

        decreaseQuantity,

        removeFromCart,

        clearCart,

        getQuantityInCart

      }}

    >

      {children}

    </CartContext.Provider>

  );

}

export default CartProvider;
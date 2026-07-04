import {
  createContext,
  useState,
  useContext,
  useEffect
} from "react";

import { NotificationContext } from "./NotificationContext";
import { AuthContext } from "./AuthContext";

export const FavoritesContext =
  createContext();

function FavoritesProvider({ children }) {

  const [favorites, setFavorites] =
    useState([]);

  const { showNotification } =
    useContext(NotificationContext);

  const { currentUser } =
    useContext(AuthContext);

  // Cargar favoritos
  useEffect(() => {

    if (!currentUser) {

      setFavorites([]);

      return;

    }

    const savedFavorites = JSON.parse(

      localStorage.getItem(

        `favorites_${currentUser.email}`

      )

    ) || [];

    setFavorites(savedFavorites);

  }, [currentUser]);

  // Guardar favoritos
  useEffect(() => {

    if (!currentUser) {

      return;

    }

    localStorage.setItem(

      `favorites_${currentUser.email}`,

      JSON.stringify(favorites)

    );

  }, [favorites, currentUser]);

  const toggleFavorite = (
    product,
    currentUser,
    navigate
  ) => {

    if (!currentUser) {

      showNotification(

        "⚠ Debe iniciar sesión para usar favoritos",

        "warning"

      );

      navigate("/login");

      return;

    }

    const exists = favorites.find(
      item => item.id === product.id
    );

    if (exists) {

      setFavorites(

        favorites.filter(
          item => item.id !== product.id
        )

      );

      showNotification(

        "❌ Producto eliminado de favoritos",

        "warning"

      );

    } else {

      setFavorites([

        ...favorites,

        product

      ]);

      showNotification(

        "❤️ Producto agregado a favoritos",

        "success"

      );

    }

  };

  return (

    <FavoritesContext.Provider

      value={{

        favorites,

        toggleFavorite

      }}

    >

      {children}

    </FavoritesContext.Provider>

  );

}

export default FavoritesProvider;
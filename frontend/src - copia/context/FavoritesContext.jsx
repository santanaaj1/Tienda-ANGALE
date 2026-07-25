import {
  createContext,
  useState,
  useContext,
  useEffect
} from "react";

import { NotificationContext } from "./NotificationContext";
import { AuthContext } from "./AuthContext";

import {

  getFavorites,
  addFavorite,
  deleteFavorite

} from "../services/favoritesService";

export const FavoritesContext =
  createContext();

function FavoritesProvider({ children }) {

  const [favorites, setFavorites] =
    useState([]);

  const {

    showNotification

  } = useContext(

    NotificationContext

  );

  const {

    currentUser

  } = useContext(

    AuthContext

  );

  /*
  |--------------------------------------------------------------------------
  | Cargar favoritos desde PostgreSQL
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    const loadFavorites = async () => {

      if (!currentUser) {

        setFavorites([]);

        return;

      }

      try {

        const data = await getFavorites();

        setFavorites(data);

      }

      catch (error) {

        console.error(error);

      }

    };

    loadFavorites();

  }, [

    currentUser

  ]);

  /*
  |--------------------------------------------------------------------------
  | Agregar / eliminar favorito
  |--------------------------------------------------------------------------
  */

  const toggleFavorite = async (

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

      item => item.producto_id === product.id

    );

    try {

      if (exists) {

        await deleteFavorite(

          exists.id

        );

        setFavorites(

          favorites.filter(

            item => item.id !== exists.id

          )

        );

        showNotification(

          "❌ Producto eliminado de favoritos",

          "warning"

        );

      }

      else {

        await addFavorite(

          product.id

        );

        const updatedFavorites = await getFavorites();

        setFavorites(

          updatedFavorites

        );

        showNotification(

          "❤️ Producto agregado a favoritos",

          "success"

        );

      }

    }

    catch (error) {

      console.error(error);

      showNotification(

        "No fue posible actualizar favoritos.",

        "error"

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
import {
  createContext,
  useState,
  useEffect,
  useContext
} from "react";

import { getCategories } from "../services/categoryService";

import {
  NotificationContext
} from "./NotificationContext";

export const CategoryContext =
  createContext();

function CategoryProvider({ children }) {

  const [categories, setCategories] =
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
  | Obtener categorías desde la API
  |--------------------------------------------------------------------------
  */

  const refreshCategories = async () => {

    try {

      const data =
        await getCategories();

      setCategories(data);

      return true;

    }

    catch (error) {

      console.error(error);

      showNotification(

        "❌ No fue posible cargar las categorías.",

        "error"

      );

      return false;

    }

  };

  useEffect(() => {

    const loadCategories = async () => {

      await refreshCategories();

      setLoading(false);

    };

    loadCategories();

  }, []);

  return (

    <CategoryContext.Provider

      value={{

        categories,

        loading,

        refreshCategories

      }}

    >

      {children}

    </CategoryContext.Provider>

  );

}

export default CategoryProvider;
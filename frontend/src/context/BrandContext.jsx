import {
  createContext,
  useState,
  useEffect,
  useContext
} from "react";

import { getBrands } from "../services/brandService";

import {
  NotificationContext
} from "./NotificationContext";

export const BrandContext =
  createContext();

function BrandProvider({ children }) {

  const [brands, setBrands] =
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
  | Obtener marcas desde la API
  |--------------------------------------------------------------------------
  */

  const refreshBrands = async () => {

    try {

      const data =
        await getBrands();

      setBrands(data);

      return true;

    }

    catch (error) {

      console.error(error);

      showNotification(

        "❌ No fue posible cargar las marcas.",

        "error"

      );

      return false;

    }

  };

  useEffect(() => {

    const loadBrands = async () => {

      await refreshBrands();

      setLoading(false);

    };

    loadBrands();

  }, []);

  return (

    <BrandContext.Provider

      value={{

        brands,

        loading,

        refreshBrands

      }}

    >

      {children}

    </BrandContext.Provider>

  );

}

export default BrandProvider;
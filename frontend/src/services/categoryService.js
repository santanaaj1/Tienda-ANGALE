const API_URL =
  import.meta.env.VITE_CATEGORIES_API_URL ||
  "http://localhost:3000/categories";

/*
|--------------------------------------------------------------------------
| Obtener todas las categorías
|--------------------------------------------------------------------------
*/

export const getCategories = async () => {

  const response = await fetch(

    API_URL

  );

  if (!response.ok) {

    throw new Error(

      "No fue posible obtener las categorías."

    );

  }

  return await response.json();

};
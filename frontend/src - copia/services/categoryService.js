const API_URL =
  `${import.meta.env.VITE_API_URL}/categories`;

/*
|--------------------------------------------------------------------------
| Obtener todas las categorías
|--------------------------------------------------------------------------
*/

export const getCategories = async () => {

  const response = await fetch(API_URL);

  if (!response.ok) {

    throw new Error(
      "No fue posible obtener las categorías."
    );

  }

  return await response.json();

};
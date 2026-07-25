const API_URL =
  import.meta.env.VITE_BRANDS_API_URL ||
  "http://localhost:3000/brands";

/*
|--------------------------------------------------------------------------
| Obtener todas las marcas
|--------------------------------------------------------------------------
*/

export const getBrands = async () => {

  const response = await fetch(API_URL);

  if (!response.ok) {

    throw new Error(

      "No fue posible obtener las marcas."

    );

  }

  return await response.json();

};
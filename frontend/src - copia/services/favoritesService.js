const API_URL =
  import.meta.env.VITE_API_URL_FAVORITES ||
  "http://localhost:3000/favorites";

/*
|--------------------------------------------------------------------------
| Obtener token
|--------------------------------------------------------------------------
*/

const getToken = () => {

  return localStorage.getItem("token");

};

/*
|--------------------------------------------------------------------------
| Obtener favoritos
|--------------------------------------------------------------------------
*/

export const getFavorites = async () => {

  const token = getToken();

  const response = await fetch(

    API_URL,

    {

      headers: {

        Authorization: `Bearer ${token}`

      }

    }

  );

  const data = await response.json();

  if (!response.ok) {

    throw new Error(

      data.message ||

      "No fue posible obtener los favoritos."

    );

  }

  return data;

};

/*
|--------------------------------------------------------------------------
| Agregar favorito
|--------------------------------------------------------------------------
*/

export const addFavorite = async (

  producto_id

) => {

  const token = getToken();

  const response = await fetch(

    API_URL,

    {

      method: "POST",

      headers: {

        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`

      },

      body: JSON.stringify({

        producto_id

      })

    }

  );

  const data = await response.json();

  if (!response.ok) {

    throw new Error(

      data.message ||

      "No fue posible agregar el favorito."

    );

  }

  return data;

};

/*
|--------------------------------------------------------------------------
| Eliminar favorito
|--------------------------------------------------------------------------
*/

export const deleteFavorite = async (

  id

) => {

  const token = getToken();

  const response = await fetch(

    `${API_URL}/${id}`,

    {

      method: "DELETE",

      headers: {

        Authorization: `Bearer ${token}`

      }

    }

  );

  const data = await response.json();

  if (!response.ok) {

    throw new Error(

      data.message ||

      "No fue posible eliminar el favorito."

    );

  }

  return data;

};
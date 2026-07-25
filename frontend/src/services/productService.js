const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:3000/products";

/*
|--------------------------------------------------------------------------
| Obtener token almacenado
|--------------------------------------------------------------------------
*/

const getToken = () => {

  return localStorage.getItem(

    "token"

  );

};

/*
|--------------------------------------------------------------------------
| Obtener todos los productos
|--------------------------------------------------------------------------
*/

export const getProducts = async () => {

  const response = await fetch(

    API_URL

  );

  if (!response.ok) {

    throw new Error(

      "No fue posible obtener los productos."

    );

  }

  return await response.json();

};

/*
|--------------------------------------------------------------------------
| Obtener un producto por ID
|--------------------------------------------------------------------------
*/

export const getProductById = async (id) => {

  const response = await fetch(

    `${API_URL}/${id}`

  );

  if (!response.ok) {

    throw new Error(

      "Producto no encontrado."

    );

  }

  return await response.json();

};

/*
|--------------------------------------------------------------------------
| Crear producto
|--------------------------------------------------------------------------
*/

export const createProduct = async (

  product

) => {

  const response = await fetch(

    API_URL,

    {

      method: "POST",

      headers: {

        "Content-Type": "application/json",

        Authorization: `Bearer ${getToken()}`

      },

      body: JSON.stringify(

        product

      )

    }

  );

  if (!response.ok) {

    throw new Error(

      "No fue posible crear el producto."

    );

  }

  return await response.json();

};

/*
|--------------------------------------------------------------------------
| Actualizar producto
|--------------------------------------------------------------------------
*/

export const updateProduct = async (

  id,

  product

) => {

  const response = await fetch(

    `${API_URL}/${id}`,

    {

      method: "PUT",

      headers: {

        "Content-Type": "application/json",

        Authorization: `Bearer ${getToken()}`

      },

      body: JSON.stringify(

        product

      )

    }

  );

  if (!response.ok) {

    throw new Error(

      "No fue posible actualizar el producto."

    );

  }

  return await response.json();

};

/*
|--------------------------------------------------------------------------
| Eliminar producto
|--------------------------------------------------------------------------
*/

export const deleteProduct = async (

  id

) => {

  const response = await fetch(

    `${API_URL}/${id}`,

    {

      method: "DELETE",

      headers: {

        Authorization: `Bearer ${getToken()}`

      }

    }

  );

  if (!response.ok) {

    throw new Error(

      "No fue posible eliminar el producto."

    );

  }

  return await response.json();

};
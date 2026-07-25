const API_URL =
  import.meta.env.VITE_API_URL_USERS ||
  "http://localhost:3000/users";

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
| Obtener todos los usuarios
|--------------------------------------------------------------------------
*/

export const getUsers = async () => {

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

      "Error al obtener los usuarios."

    );

  }

  return data;

};

/*
|--------------------------------------------------------------------------
| Iniciar sesión
|--------------------------------------------------------------------------
*/

export const loginUser = async (

  email,

  password

) => {

  const response = await fetch(

    `${API_URL}/login`,

    {

      method: "POST",

      headers: {

        "Content-Type": "application/json"

      },

      body: JSON.stringify({

        email,

        password

      })

    }

  );

  const data = await response.json();

  if (!response.ok) {

    throw new Error(

      data.message ||

      "Error al iniciar sesión."

    );

  }

  return data;

};

/*
|--------------------------------------------------------------------------
| Registrar usuario
|--------------------------------------------------------------------------
*/

export const registerUser = async (

  user

) => {

  const response = await fetch(

    `${API_URL}/register`,

    {

      method: "POST",

      headers: {

        "Content-Type": "application/json"

      },

      body: JSON.stringify(user)

    }

  );

  const data = await response.json();

  if (!response.ok) {

    throw new Error(

      data.message ||

      "Error al registrar usuario."

    );

  }

  return data;

};

/*
|--------------------------------------------------------------------------
| Cambiar contraseña
|--------------------------------------------------------------------------
*/

export const changePassword = async (

  currentPassword,

  newPassword

) => {

  const token = getToken();

  const response = await fetch(

    `${API_URL}/password`,

    {

      method: "PUT",

      headers: {

        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`

      },

      body: JSON.stringify({

        currentPassword,

        newPassword

      })

    }

  );

  const data = await response.json();

  if (!response.ok) {

    throw new Error(

      data.message ||

      "No fue posible actualizar la contraseña."

    );

  }

  return data;

};
const API_URL =
  import.meta.env.VITE_API_URL_ORDERS ||
  "http://localhost:3000/orders";

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
| Obtener pedidos
|--------------------------------------------------------------------------
*/

export const getOrders = async (usuario_id = null) => {

  const token = getToken();

  const url = usuario_id

    ? `${API_URL}?usuario_id=${usuario_id}`

    : API_URL;

  const response = await fetch(

    url,

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

      "No fue posible obtener los pedidos."

    );

  }

  return data;

};

/*
|--------------------------------------------------------------------------
| Obtener un pedido por ID
|--------------------------------------------------------------------------
*/

export const getOrderById = async (

  id,

  usuario_id

) => {

  const token = getToken();

  const response = await fetch(

    `${API_URL}/${id}?usuario_id=${usuario_id}`,

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

      "Pedido no encontrado."

    );

  }

  return data;

};

/*
|--------------------------------------------------------------------------
| Crear pedido
|--------------------------------------------------------------------------
*/

export const createOrder = async (

  cartItems,

  total

) => {

  const token = getToken();

  const order = {

    total,

    productos: cartItems.map(item => ({

      producto_id: item.id,

      cantidad: item.quantity,

      precio: Number(item.precio)

    }))

  };

  const response = await fetch(

    API_URL,

    {

      method: "POST",

      headers: {

        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`

      },

      body: JSON.stringify(order)

    }

  );

  const data = await response.json();

  if (!response.ok) {

    throw new Error(

      data.message ||

      "No fue posible crear el pedido."

    );

  }

  return data;

};

/*
|--------------------------------------------------------------------------
| Eliminar pedido
|--------------------------------------------------------------------------
*/

export const deleteOrder = async (

  id,

  usuario_id

) => {

  const token = getToken();

  const response = await fetch(

    `${API_URL}/${id}?usuario_id=${usuario_id}`,

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

      "No fue posible eliminar el pedido."

    );

  }

  return data;

};
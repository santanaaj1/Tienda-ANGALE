import {
  createContext,
  useState,
  useEffect
} from "react";

export const DataContext =
  createContext();

function DataProvider({ children }) {

  const [users, setUsers] =
    useState([]);

  const [orders, setOrders] =
    useState([]);

  // Cargar información desde localStorage
  const refreshData = () => {

    const savedUsers = JSON.parse(

      localStorage.getItem(

        "users"

      )

    ) || [];

    const savedOrders = JSON.parse(

      localStorage.getItem(

        "orders"

      )

    ) || [];

    setUsers(savedUsers);

    setOrders(savedOrders);

  };

  useEffect(() => {

    refreshData();

  }, []);

  // Guardar usuarios
  useEffect(() => {

    localStorage.setItem(

      "users",

      JSON.stringify(users)

    );

  }, [users]);

  // Guardar pedidos
  useEffect(() => {

    localStorage.setItem(

      "orders",

      JSON.stringify(orders)

    );

  }, [orders]);

  // Usuarios

  const addUser = user => {

    setUsers(

      previous => [

        ...previous,

        user

      ]

    );

  };

  const updateUser = updatedUser => {

    setUsers(

      previous =>

        previous.map(user =>

          user.email === updatedUser.email

            ? updatedUser

            : user

        )

    );

  };

  const deleteUser = email => {

    setUsers(

      previous =>

        previous.filter(

          user =>

            user.email !== email

        )

    );

  };

  // Pedidos

  const addOrder = order => {

    setOrders(

      previous => [

        ...previous,

        order

      ]

    );

  };

  const updateOrder = updatedOrder => {

    setOrders(

      previous =>

        previous.map(order =>

          order.id === updatedOrder.id

            ? updatedOrder

            : order

        )

    );

  };

  const deleteOrder = id => {

    setOrders(

      previous =>

        previous.filter(

          order =>

            order.id !== id

        )

    );

  };

  return (

    <DataContext.Provider

      value={{

        users,

        orders,

        addUser,

        updateUser,

        deleteUser,

        addOrder,

        updateOrder,

        deleteOrder,

        refreshData

      }}

    >

      {children}

    </DataContext.Provider>

  );

}

export default DataProvider;
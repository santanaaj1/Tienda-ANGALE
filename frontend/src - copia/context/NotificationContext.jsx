import {
  createContext,
  useState
} from "react";

export const NotificationContext =
  createContext();

function NotificationProvider({
  children
}) {

  const [notification, setNotification] =
    useState(null);

  const showNotification = (
    message,
    type = "success"
  ) => {

    setNotification({

      message,

      type

    });

    setTimeout(() => {

      setNotification(null);

    }, 3000);

  };

  return (

    <NotificationContext.Provider

      value={{

        showNotification,

        notification

      }}

    >

      {children}

    </NotificationContext.Provider>

  );

}

export default NotificationProvider;
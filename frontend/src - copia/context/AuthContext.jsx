import {
  createContext,
  useState,
  useEffect
} from "react";

import {
  loginUser,
  changePassword as changePasswordService
} from "../services/authService";

export const AuthContext =
  createContext();

function AuthProvider({ children }) {

  const [currentUser, setCurrentUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const savedUser = JSON.parse(

      localStorage.getItem(

        "currentUser"

      )

    );

    if (savedUser) {

      setCurrentUser(savedUser);

    }

    setLoading(false);

  }, []);

  /*
  |--------------------------------------------------------------------------
  | Login
  |--------------------------------------------------------------------------
  */

  const login = async (

    email,

    password

  ) => {

    try {

      const data = await loginUser(

        email,

        password

      );

      localStorage.setItem(

        "token",

        data.token

      );

      const user = {

        id: data.usuario.id,

        nombre: data.usuario.nombre,

        apellido: data.usuario.apellido,

        email: data.usuario.email,

        role: data.usuario.rol

      };

      setCurrentUser(user);

      localStorage.setItem(

        "currentUser",

        JSON.stringify(user)

      );

      return true;

    }

    catch (error) {

      console.error(error);

      return false;

    }

  };

  /*
  |--------------------------------------------------------------------------
  | Cambiar contraseña
  |--------------------------------------------------------------------------
  */

  const changePassword = async (

    currentPassword,

    newPassword

  ) => {

    try {

      const result = await changePasswordService(

        currentPassword,

        newPassword

      );

      return {

        success: true,

        message: result.message

      };

    }

    catch (error) {

      return {

        success: false,

        message: error.message

      };

    }

  };

  /*
  |--------------------------------------------------------------------------
  | Logout
  |--------------------------------------------------------------------------
  */

  const logout = () => {

    setCurrentUser(null);

    localStorage.removeItem(

      "currentUser"

    );

    localStorage.removeItem(

      "token"

    );

  };

  return (

    <AuthContext.Provider

      value={{

        currentUser,

        loading,

        login,

        logout,

        changePassword

      }}

    >

      {children}

    </AuthContext.Provider>

  );

}

export default AuthProvider;
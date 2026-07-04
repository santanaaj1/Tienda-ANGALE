import {
  createContext,
  useState,
  useEffect
} from "react";

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

  // Registrar usuario
  const register = (
    nombre,
    email,
    password
  ) => {

    const users = JSON.parse(

      localStorage.getItem(
        "users"

      )

    ) || [];

    const userExists = users.find(

      user => user.email === email

    );

    if (userExists) {

      return false;

    }

    const newUser = {

      nombre,

      email,

      password,

      role: "user"

    };

    users.push(newUser);

    localStorage.setItem(

      "users",

      JSON.stringify(users)

    );

    return true;

  };

  // Login
  const login = (
    email,
    password
  ) => {

    const users = JSON.parse(

      localStorage.getItem(
        "users"
      )

    ) || [];

    const adminUser = {

      nombre: "Administrador",

      email: "admin@angale.com",

      password: "123456",

      role: "admin"

    };

    const allUsers = [

      ...users,

      adminUser

    ];

    const foundUser = allUsers.find(

      user =>

        user.email === email &&
        user.password === password

    );

    if (!foundUser) {

      return false;

    }

    setCurrentUser(foundUser);

    localStorage.setItem(

      "currentUser",

      JSON.stringify(foundUser)

    );

    return true;

  };

  // Cambiar contraseña
  const changePassword = (

    currentPassword,

    newPassword

  ) => {

    if (

      currentUser.password !== currentPassword

    ) {

      return {

        success: false,

        message:

          "La contraseña actual es incorrecta"

      };

    }

    if (

      currentUser.role === "admin"

    ) {

      const updatedAdmin = {

        ...currentUser,

        password: newPassword

      };

      setCurrentUser(updatedAdmin);

      localStorage.setItem(

        "currentUser",

        JSON.stringify(updatedAdmin)

      );

      return {

        success: true,

        message:

          "Contraseña actualizada correctamente"

      };

    }

    const users = JSON.parse(

      localStorage.getItem(
        "users"
      )

    ) || [];

    const updatedUsers = users.map(

      user =>

        user.email === currentUser.email

          ? {

              ...user,

              password: newPassword

            }

          : user

    );

    localStorage.setItem(

      "users",

      JSON.stringify(updatedUsers)

    );

    const updatedCurrentUser = {

      ...currentUser,

      password: newPassword

    };

    setCurrentUser(

      updatedCurrentUser

    );

    localStorage.setItem(

      "currentUser",

      JSON.stringify(updatedCurrentUser)

    );

    return {

      success: true,

      message:

        "Contraseña actualizada correctamente"

    };

  };

  // Logout
  const logout = () => {

    setCurrentUser(null);

    localStorage.removeItem(

      "currentUser"

    );

  };

  return (

    <AuthContext.Provider

      value={{

        currentUser,

        loading,

        register,

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
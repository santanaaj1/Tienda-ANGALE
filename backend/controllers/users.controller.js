import {

  getUsers,

  createUser,

  loginUser,

  updatePassword

} from "../queries/users.js";

/*
|--------------------------------------------------------------------------
| Obtener todos los usuarios
|--------------------------------------------------------------------------
*/

const readUsers = async (request, response) => {

  try {

    const users = await getUsers();

    response.status(200).json(users);

  }

  catch (error) {

    console.error(error);

    response.status(500).json({

      message: "Error al obtener los usuarios"

    });

  }

};

/*
|--------------------------------------------------------------------------
| Registrar usuario
|--------------------------------------------------------------------------
*/

const registerUser = async (request, response) => {

  try {

    const {

      nombre,

      apellido,

      email,

      password

    } = request.body;

    /*
    |--------------------------------------------------------------------------
    | Validaciones
    |--------------------------------------------------------------------------
    */

    if (!nombre?.trim()) {

      return response.status(400).json({

        message: "El nombre es obligatorio."

      });

    }

    if (!apellido?.trim()) {

      return response.status(400).json({

        message: "El apellido es obligatorio."

      });

    }

    if (!email?.trim()) {

      return response.status(400).json({

        message: "El correo electrónico es obligatorio."

      });

    }

    const emailRegex =

      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (

      !emailRegex.test(email)

    ) {

      return response.status(400).json({

        message: "El correo electrónico no tiene un formato válido."

      });

    }

    if (!password) {

      return response.status(400).json({

        message: "La contraseña es obligatoria."

      });

    }

    if (password.length < 6) {

      return response.status(400).json({

        message: "La contraseña debe tener al menos 6 caracteres."

      });

    }

    /*
    |--------------------------------------------------------------------------
    | Registrar usuario
    |--------------------------------------------------------------------------
    */

    const newUser = await createUser(

      request.body

    );

    return response.status(201).json(

      newUser

    );

  }

  catch (error) {

    console.error(error);

    /*
    |--------------------------------------------------------------------------
    | Correo duplicado
    |--------------------------------------------------------------------------
    */

    if (

      error.message ===

      "El correo electrónico ya se encuentra registrado."

    ) {

      return response.status(409).json({

        message: error.message

      });

    }

    return response.status(500).json({

      message: "Error al registrar el usuario"

    });

  }

};

/*
|--------------------------------------------------------------------------
| Iniciar sesión
|--------------------------------------------------------------------------
*/

const login = async (request, response) => {

  try {

    const {

      email,

      password

    } = request.body;

    const result = await loginUser(

      email,

      password

    );

    response.status(200).json(result);

  }

  catch (error) {

    console.error(error);

    response.status(401).json({

      message: error.message

    });

  }

};

/*
|--------------------------------------------------------------------------
| Cambiar contraseña
|--------------------------------------------------------------------------
*/

const changePassword = async (request, response) => {

  try {

    const {

      currentPassword,

      newPassword

    } = request.body;

    const result = await updatePassword(

      request.user.id,

      currentPassword,

      newPassword

    );

    response.status(200).json(result);

  }

  catch (error) {

    console.error(error);

    response.status(400).json({

      message: error.message

    });

  }

};

export {

  readUsers,

  registerUser,

  login,

  changePassword

};
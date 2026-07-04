import {

  getUsers,

  createUser,

  loginUser

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

    const newUser = await createUser(

      request.body

    );

    response.status(201).json(newUser);

  }

  catch (error) {

    console.error(error);

    response.status(500).json({

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

export {

  readUsers,

  registerUser,

  login

};
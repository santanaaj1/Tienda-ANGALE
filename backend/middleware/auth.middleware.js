import jwt from "jsonwebtoken";

const verifyToken = (request, response, next) => {

  try {

    const authorization = request.header("Authorization");

    if (!authorization) {

      return response.status(401).json({

        message: "Token no proporcionado"

      });

    }

    const token = authorization.replace(

      "Bearer ",

      ""

    );

    const decoded = jwt.verify(

      token,

      process.env.JWT_SECRET

    );

    request.user = decoded;

    next();

  }

  catch (error) {

    return response.status(401).json({

      message: "Token inválido"

    });

  }

};

export default verifyToken;
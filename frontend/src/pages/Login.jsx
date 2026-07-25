import "../styles/Login.css";

import {
  useState,
  useContext
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  AuthContext
} from "../context/AuthContext";

import {
  registerUser
} from "../services/authService";

function Login() {

  const navigate = useNavigate();

  const {

    login

  } = useContext(

    AuthContext

  );

  /* LOGIN */

  const [loginEmail, setLoginEmail] =
    useState("");

  const [loginPassword, setLoginPassword] =
    useState("");

  const [loginMessage, setLoginMessage] =
    useState("");

  const [loginSuccess, setLoginSuccess] =
    useState(false);

  /* REGISTER */

  const [name, setName] =
    useState("");

  const [apellido, setApellido] =
    useState("");

  const [registerEmail, setRegisterEmail] =
    useState("");

  const [registerPassword, setRegisterPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [registerMessage, setRegisterMessage] =
    useState("");

  const [registerSuccess, setRegisterSuccess] =
    useState(false);

  /*
  |--------------------------------------------------------------------------
  | LOGIN
  |--------------------------------------------------------------------------
  */

  const handleLogin = async (

    event

  ) => {

    event.preventDefault();

    if (

      loginEmail === "" ||

      loginPassword === ""

    ) {

      setLoginSuccess(false);

      setLoginMessage(

        "Complete todos los campos."

      );

      return;

    }

    const success = await login(

      loginEmail,

      loginPassword

    );

    if (!success) {

      setLoginSuccess(false);

      setLoginMessage(

        "Correo o contraseña incorrectos."

      );

      return;

    }

    setLoginSuccess(true);

    setLoginMessage(

      "Inicio de sesión exitoso."

    );

    if (

      loginEmail ===

      "admin@angale.com"

    ) {

      navigate("/admin");

    }

    else {

      navigate("/");

    }

  };

  /*
  |--------------------------------------------------------------------------
  | REGISTER
  |--------------------------------------------------------------------------
  */

  const handleRegister = async (

    event

  ) => {

    event.preventDefault();

    if (

      name === "" ||

      apellido === "" ||

      registerEmail === "" ||

      registerPassword === "" ||

      confirmPassword === ""

    ) {

      setRegisterSuccess(false);

      setRegisterMessage(

        "Complete todos los campos."

      );

      return;

    }

    if (

      registerPassword !==

      confirmPassword

    ) {

      setRegisterSuccess(false);

      setRegisterMessage(

        "Las contraseñas no coinciden."

      );

      return;

    }

    try {

      await registerUser({

        nombre: name,

        apellido,

        email: registerEmail,

        password: registerPassword

      });

      setRegisterSuccess(true);

      setRegisterMessage(

        "Cuenta creada correctamente."

      );

      setName("");

      setApellido("");

      setRegisterEmail("");

      setRegisterPassword("");

      setConfirmPassword("");

    }

    catch (error) {

      setRegisterSuccess(false);

      setRegisterMessage(

        error.message

      );

    }

  };

  return (

        <div className="auth-container">

      <div className="auth-card">

        <h1 className="auth-title">

          Mi Cuenta

        </h1>

        <p className="auth-subtitle">

          Accede o crea una cuenta para continuar.

        </p>

        <div className="auth-forms">

          {/* LOGIN */}

          <div className="form-section">

            <h2>

              Iniciar Sesión

            </h2>

            <p className="form-description">

              Accede con tu cuenta para continuar.

            </p>

            <form

              className="auth-form"

              onSubmit={handleLogin}

            >

              <input

                type="email"

                placeholder="Correo electrónico"

                value={loginEmail}

                onChange={(event) =>

                  setLoginEmail(

                    event.target.value

                  )

                }

              />

              <input

                type="password"

                placeholder="Contraseña"

                value={loginPassword}

                onChange={(event) =>

                  setLoginPassword(

                    event.target.value

                  )

                }

              />

              <button>

                Ingresar

              </button>

            </form>

            {

              loginMessage && (

                <p

                  className={

                    loginSuccess

                      ? "form-message success-message"

                      : "form-message error-message"

                  }

                >

                  {

                    loginSuccess

                      ? "✅ "

                      : "❌ "

                  }

                  {loginMessage}

                </p>

              )

            }

            <p className="forgot-password">

              ¿Olvidaste tu contraseña?

            </p>

          </div>

          <div className="vertical-divider"></div>

          {/* REGISTER */}

          <div className="form-section">

            <h2>

              Regístrate

            </h2>

            <p className="form-description">

              Crea una cuenta y comienza a comprar.

            </p>

            <form

              className="auth-form"

              onSubmit={handleRegister}

            >

              <input

                type="text"

                placeholder="Nombre"

                value={name}

                onChange={(event) =>

                  setName(

                    event.target.value

                  )

                }

              />

              <input

                type="text"

                placeholder="Apellido"

                value={apellido}

                onChange={(event) =>

                  setApellido(

                    event.target.value

                  )

                }

              />

              <input

                type="email"

                placeholder="Correo electrónico"

                value={registerEmail}

                onChange={(event) =>

                  setRegisterEmail(

                    event.target.value

                  )

                }

              />

              <input

                type="password"

                placeholder="Contraseña"

                value={registerPassword}

                onChange={(event) =>

                  setRegisterPassword(

                    event.target.value

                  )

                }

              />

              <input

                type="password"

                placeholder="Confirmar contraseña"

                value={confirmPassword}

                onChange={(event) =>

                  setConfirmPassword(

                    event.target.value

                  )

                }

              />

              <button>

                Registrarse

              </button>

            </form>

            {

              registerMessage && (

                <p

                  className={

                    registerSuccess

                      ? "form-message success-message"

                      : "form-message error-message"

                  }

                >

                  {

                    registerSuccess

                      ? "✅ "

                      : "❌ "

                  }

                  {registerMessage}

                </p>

              )

            }

          </div>

        </div>

        <button

          className="back-button"

          onClick={() =>

            navigate("/")

          }

        >

          ← Volver al inicio

        </button>

      </div>

    </div>

  );

}

export default Login;
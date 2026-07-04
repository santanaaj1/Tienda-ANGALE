import "../styles/Profile.css";

import {
  useContext,
  useState
} from "react";

import {
  AuthContext
} from "../context/AuthContext";

import {
  DataContext
} from "../context/DataContext";

function Profile() {

  const {

    currentUser,

    changePassword

  } = useContext(

    AuthContext

  );

  const {

    orders

  } = useContext(

    DataContext

  );

  const [

    currentPassword,

    setCurrentPassword

  ] = useState("");

  const [

    newPassword,

    setNewPassword

  ] = useState("");

  const [

    confirmPassword,

    setConfirmPassword

  ] = useState("");

  const [

    message,

    setMessage

  ] = useState("");

  const [

    messageType,

    setMessageType

  ] = useState("");

  const userOrders = orders.filter(

    order =>

      order.cliente === currentUser?.email

  );

  const handleSubmit = (

    event

  ) => {

    event.preventDefault();

    if (

      newPassword !== confirmPassword

    ) {

      setMessage(

        "Las contraseñas no coinciden"

      );

      setMessageType(

        "error"

      );

      return;

    }

    const result =

      changePassword(

        currentPassword,

        newPassword

      );

    setMessage(

      result.message

    );

    setMessageType(

      result.success

        ? "success"

        : "error"

    );

    if (

      result.success

    ) {

      setCurrentPassword("");

      setNewPassword("");

      setConfirmPassword("");

    }

  };

  return (

    <div className="profile-container">

      <h1 className="profile-title">

        Mi Perfil

      </h1>

      <div className="profile-content">

        {/* DATOS PERSONALES */}

        <div className="profile-card">

          <h2>

            Información Personal

          </h2>

          <div className="profile-info">

            <p>

              <strong>

                Nombre:

              </strong>

              {" "}

              {currentUser?.nombre}

            </p>

            <p>

              <strong>

                Correo:

              </strong>

              {" "}

              {currentUser?.email}

            </p>

          </div>

        </div>

        {/* CONTRASEÑA */}

        <div className="profile-card">

          <h2>

            Cambiar contraseña

          </h2>

          <form

            className="password-form"

            onSubmit={handleSubmit}

          >

            <input

              type="password"

              placeholder="Contraseña actual"

              value={currentPassword}

              onChange={(e) =>

                setCurrentPassword(

                  e.target.value

                )

              }

            />

            <input

              type="password"

              placeholder="Nueva contraseña"

              value={newPassword}

              onChange={(e) =>

                setNewPassword(

                  e.target.value

                )

              }

            />

            <input

              type="password"

              placeholder="Confirmar contraseña"

              value={confirmPassword}

              onChange={(e) =>

                setConfirmPassword(

                  e.target.value

                )

              }

            />

            <button>

              Actualizar contraseña

            </button>

          </form>

          {

            message && (

              <p

                className={

                  messageType === "success"

                    ? "success-message"

                    : "error-message"

                }

              >

                {message}

              </p>

            )

          }

        </div>

        {/* PEDIDOS */}

        <div className="profile-card">

          <h2>

            Mis pedidos

          </h2>

          {

            userOrders.length > 0 ?

            (

              userOrders.map(

                order => (

                  <div

                    key={order.id}

                    className="order-item"

                  >

                    <span>

                      Pedido #{order.id}

                    </span>

                    <span>

                      {order.fecha}

                    </span>

                    <span>

                      $

                      {order.total.toLocaleString(

                        "es-CL"

                      )}

                    </span>

                  </div>

                )

              )

            )

            :

            (

              <p>

                Aún no has realizado compras.

              </p>

            )

          }

        </div>

      </div>

    </div>

  );

}

export default Profile;
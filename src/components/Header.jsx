import "../styles/Header.css";

import {
  NavLink,
  useLocation,
  useNavigate
} from "react-router-dom";

import {
  useState,
  useContext
} from "react";

import CartPreview from "./CartPreview";

import {
  SearchContext
} from "../context/SearchContext";

import {
  AuthContext
} from "../context/AuthContext";

function Header() {

  const [showCartPreview, setShowCartPreview] =
    useState(false);

  const location = useLocation();

  const navigate = useNavigate();

  const {
    searchTerm,
    setSearchTerm
  } = useContext(SearchContext);

  const {
    currentUser,
    logout
  } = useContext(AuthContext);

  const isCartPage =
    location.pathname === "/cart";

  const handleSearch = (event) => {

    if (event.key === "Enter") {

      navigate("/search");

    }

  };

  const handleSearchButton = () => {

    navigate("/search");

  };

  const handleHome = () => {

    setSearchTerm("");

    navigate("/");

  };

  const handleLogout = () => {

    logout();

    navigate("/");

  };

  return (

    <header>

      <div>

        <button
          className="logo"
          onClick={handleHome}
        >

          ANGALE

        </button>

      </div>

      <div className="search-container">

        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(event) =>
            setSearchTerm(
              event.target.value
            )
          }
          onKeyDown={handleSearch}
        />

        <button
          className="search-button"
          onClick={handleSearchButton}
        >

          Buscar

        </button>

      </div>

      <nav>

        {

          currentUser

          ?

          <>

            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive
                  ? "nav-active"
                  : ""
              }
            >

              Hola, {currentUser.nombre}

            </NavLink>

            {

              currentUser.role === "admin" && (

                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    isActive
                      ? "nav-active"
                      : ""
                  }
                >

                  Panel Admin

                </NavLink>

              )

            }

          </>

          :

          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? "nav-active"
                : ""
            }
          >

            Cuenta

          </NavLink>

        }

        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            isActive
              ? "nav-active"
              : ""
          }
        >

          Favoritos

        </NavLink>

        <div className="cart-container">

          <button
            className={

              isCartPage

                ? "cart-button cart-active"

                : "cart-button"

            }

            onClick={() => {

              if (!isCartPage) {

                setShowCartPreview(

                  !showCartPreview

                );

              }

            }}

          >

            Carrito

          </button>

          {

            !isCartPage &&
            showCartPreview && (

              <CartPreview
                onClose={() =>
                  setShowCartPreview(false)
                }
              />

            )

          }

        </div>

        {

          currentUser && (

            <button
              className="logout-button"
              onClick={handleLogout}
            >

              Salir

            </button>

          )

        }

      </nav>

    </header>

  );

}

export default Header;
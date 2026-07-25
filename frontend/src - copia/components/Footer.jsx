import { Link } from "react-router-dom";

import "../styles/Footer.css";

function Footer() {

  return (

    <footer className="footer">

      <div className="footer-container">

        <div className="footer-section">

          <h3>ANGALE</h3>

          <p>

            Tecnología, innovación y los mejores productos
            para nuestros clientes.

          </p>

        </div>

        <div className="footer-section">

          <h4>Categorías</h4>

          <ul>

            <li>

              <Link to="/products/smartphones">
                Smartphones
              </Link>

            </li>

            <li>

              <Link to="/products/laptops">
                Laptops
              </Link>

            </li>

            <li>

              <Link to="/products/audio">
                Audio
              </Link>

            </li>

            <li>

              <Link to="/products/gaming">
                Gaming
              </Link>

            </li>

          </ul>

        </div>

        <div className="footer-section">

          <h4>Cuenta</h4>

          <ul>

            <li>

              <Link to="/login">
                Iniciar sesión
              </Link>

            </li>

            <li>

              <Link to="/login">
                Registrarse
              </Link>

            </li>

            <li>

              <Link to="/favorites">
                Favoritos
              </Link>

            </li>

          </ul>

        </div>

        <div className="footer-section">

          <h4>Ayuda</h4>

          <ul>

            <li>Contacto</li>

            <li>Preguntas frecuentes</li>

            <li>Términos y condiciones</li>

          </ul>

        </div>

      </div>

      <div className="footer-bottom">

        <p>

          © 2026 ANGALE. Todos los derechos reservados.

        </p>

      </div>

    </footer>

  );

}

export default Footer;
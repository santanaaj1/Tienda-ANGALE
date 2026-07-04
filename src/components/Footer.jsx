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
            <li>Smartphones</li>
            <li>Laptops</li>
            <li>Audio</li>
            <li>Gaming</li>
          </ul>

        </div>

        <div className="footer-section">

          <h4>Cuenta</h4>

          <ul>
            <li>Iniciar sesión</li>
            <li>Registrarse</li>
            <li>Favoritos</li>
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
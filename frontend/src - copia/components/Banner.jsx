import "../styles/Banner.css";
import { useNavigate } from "react-router-dom";

function Banner() {

  const navigate = useNavigate();

  const handleShopNow = () => {

    navigate("/products");

  };

  return (

    <section className="banner">

      <div className="banner-content">

        <h1>

          OFERTAS TECNOLÓGICAS

        </h1>

        <p>

          Los mejores smartphones, laptops,
          smartwatch y accesorios al mejor precio.

        </p>

        <button
          onClick={handleShopNow}
        >

          Comprar ahora

        </button>

      </div>

    </section>

  );

}

export default Banner;
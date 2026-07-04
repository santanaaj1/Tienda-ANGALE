import {
  useContext
} from "react";

import ProductCard from "./ProductCard";

import "../styles/FeaturedProducts.css";

import {
  ProductContext
} from "../context/ProductContext";

function FeaturedProducts() {

  const {

    products

  } = useContext(

    ProductContext

  );

  return (

    <section className="featured-products">

      <h2>

        Productos Destacados

      </h2>

      <div className="products-container">

        {

          products.map(

            producto => (

              <ProductCard

                key={producto.id}

                id={producto.id}

                nombre={producto.nombre}

                descripcion={producto.descripcion}

                precio={producto.precio}

                icono={producto.icono}

                stock={producto.stock}

              />

            )

          )

        }

      </div>

    </section>

  );

}

export default FeaturedProducts;
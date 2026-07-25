import {
  useContext
} from "react";

import ProductCard from "../components/ProductCard";

import {
  SearchContext
} from "../context/SearchContext";

import {
  ProductContext
} from "../context/ProductContext";

import {
  CategoryContext
} from "../context/CategoryContext";

function SearchResults() {

  const {

    searchTerm

  } = useContext(

    SearchContext

  );

  const {

    products

  } = useContext(

    ProductContext

  );

  const {

    categories

  } = useContext(

    CategoryContext

  );

  const normalizedSearch =

    searchTerm

      .trim()

      .toLowerCase();

  const filteredProducts =

    normalizedSearch === ""

      ? products

      : products.filter(product => {

          const category =

            categories.find(

              item =>

                item.value === product.categoria

            );

          const categoryLabel =

            category

              ? category.label.toLowerCase()

              : "";

          return (

            product.nombre

              .toLowerCase()

              .includes(normalizedSearch)

            ||

            product.marca

              .toLowerCase()

              .includes(normalizedSearch)

            ||

            product.categoria

              .toLowerCase()

              .includes(normalizedSearch)

            ||

            categoryLabel.includes(

              normalizedSearch

            )

          );

        });

  return (

    <div className="products-page">

      <h1 className="products-page-title">

        {

          normalizedSearch === ""

            ? "Todos los productos"

            : "Resultados de búsqueda"

        }

      </h1>

      {

        normalizedSearch !== "" && (

          <p

            style={{

              marginBottom: "10px",

              color: "#64748b"

            }}

          >

            Búsqueda:

            {" "}

            <strong>

              {searchTerm}

            </strong>

          </p>

        )

      }

      <p

        style={{

          marginBottom: "30px",

          color: "#64748b"

        }}

      >

        {

          filteredProducts.length === 1

            ? "1 producto encontrado"

            : `${filteredProducts.length} productos encontrados`

        }

      </p>

      <section className="products-grid-page">

        {

          filteredProducts.length > 0

            ? (

                filteredProducts.map(product => (

                  <ProductCard

                    key={product.id}

                    {...product}

                  />

                ))

              )

            : (

                <div className="empty-products">

                  <h2>

                    No se encontraron productos

                  </h2>

                  <p>

                    Intenta buscar por nombre,

                    categoría o marca.

                  </p>

                </div>

              )

        }

      </section>

    </div>

  );

}

export default SearchResults;
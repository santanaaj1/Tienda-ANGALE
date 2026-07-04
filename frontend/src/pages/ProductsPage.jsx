import {
  useContext,
  useMemo,
  useState,
  useEffect
} from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import ProductCard from "../components/ProductCard";

import {
  ProductContext
} from "../context/ProductContext";

import categories from "../data/categories";

import "../styles/ProductsPage.css";

function ProductsPage() {

  const {

    products

  } = useContext(

    ProductContext

  );

  const {

    category

  } = useParams();

  const navigate =
    useNavigate();

  const [

    selectedBrand,

    setSelectedBrand

  ] = useState("");

  useEffect(() => {

    setSelectedBrand("");

  }, [category]);

  const currentCategory =

    categories.find(

      item =>

        item.value === category

    );

  const pageTitle =

    currentCategory

      ? currentCategory.label

      : category;

  const brands = useMemo(() => {

    return [

      ...new Set(

        products

          .filter(

            product =>

              product.categoria === category

          )

          .map(

            product =>

              product.marca

          )

      )

    ];

  }, [

    products,

    category

  ]);

  const filteredProducts =

    products.filter(product => {

      const categoryMatch =

        product.categoria === category;

      const brandMatch =

        selectedBrand === "" ||

        product.marca === selectedBrand;

      return categoryMatch && brandMatch;

    });

  return (

    <div className="products-page">

      <h1 className="products-page-title">

        {pageTitle}

      </h1>

      <div className="products-layout">

        <aside className="filters-panel">

          <h3>

            Filtros

          </h3>

          <div className="active-category">

            Categoría actual:

            <strong>

              {" "}

              {pageTitle}

            </strong>

          </div>

          <div className="filter-group">

            <h4>

              Categoría

            </h4>

            {

              categories.map(cat => (

                <label

                  key={cat.value}

                >

                  <input

                    type="radio"

                    name="category"

                    checked={

                      category === cat.value

                    }

                    onChange={() =>

                      navigate(

                        `/products/${cat.value}`

                      )

                    }

                  />

                  {cat.label}

                </label>

              ))

            }

          </div>

          <div className="filter-group">

            <h4>

              Marca

            </h4>

            <label>

              <input

                type="radio"

                name="brand"

                checked={

                  selectedBrand === ""

                }

                onChange={() =>

                  setSelectedBrand("")

                }

              />

              Todas

            </label>

            {

              brands.map(brand => (

                <label

                  key={brand}

                >

                  <input

                    type="radio"

                    name="brand"

                    checked={

                      selectedBrand === brand

                    }

                    onChange={() =>

                      setSelectedBrand(

                        brand

                      )

                    }

                  />

                  {brand}

                </label>

              ))

            }

          </div>

        </aside>

        <section className="products-grid-page">

          {

            filteredProducts.length > 0

            ?

            (

              filteredProducts.map(

                product => (

                  <ProductCard

                    key={product.id}

                    id={product.id}

                    nombre={product.nombre}

                    descripcion={product.descripcion}

                    precio={product.precio}

                    icono={product.icono}

                    stock={product.stock}

                  />

                )

              )

            )

            :

            (

              <div className="empty-products">

                <h2>

                  No hay productos disponibles

                </h2>

                <p>

                  No existen productos con los filtros seleccionados.

                </p>

              </div>

            )

          }

        </section>

      </div>

    </div>

  );

}

export default ProductsPage;
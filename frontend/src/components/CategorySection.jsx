import { useContext } from "react";

import "../styles/CategorySection.css";

import CategoryCard from "./CategoryCard";

import {
  CategoryContext
} from "../context/CategoryContext";

function CategorySection() {

  const {

    categories,

    loading

  } = useContext(

    CategoryContext

  );

  if (loading) {

    return <p>Cargando categorías...</p>;

  }

  return (

    <section className="category-section">

      <h2>

        Categorías

      </h2>

      <div className="category-container">

        {

          categories.map(category => (

            <CategoryCard

              key={category.id}

              category={category}

            />

          ))

        }

      </div>

    </section>

  );

}

export default CategorySection;
import "../styles/CategoryCard.css";
import { Link } from "react-router-dom";

function CategoryCard({ category }) {
  return (
    <Link
      to={`/products/${category.value}`}
      className="category-link"
    >
      <div className="category-card">

        {category.image && (
          <img
            src={category.image}
            alt={category.label}
            className="category-image"
          />
        )}

        <div className="category-content">

          <h3>{category.label}</h3>

          {category.description && (
            <p>{category.description}</p>
          )}

        </div>

      </div>
    </Link>
  );
}

export default CategoryCard;
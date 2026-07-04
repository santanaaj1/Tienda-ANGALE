import "../styles/CategorySection.css";

import { Link } from "react-router-dom";

function CategorySection() {
  return (
    <section className="category-section">

      <h2>Categorías</h2>

      <div className="category-container">

        <Link to="/products/smartphones" className="category-link">
          <div className="category-card">
            <div className="category-icon">📱</div>
            <p>Smartphones</p>
          </div>
        </Link>

        <Link to="/products/smartwatch" className="category-link">
          <div className="category-card">
            <div className="category-icon">⌚</div>
            <p>Smartwatch</p>
          </div>
        </Link>

        <Link to="/products/laptops" className="category-link">
          <div className="category-card">
            <div className="category-icon">💻</div>
            <p>Laptops</p>
          </div>
        </Link>

        <Link to="/products/audio" className="category-link">
          <div className="category-card">
            <div className="category-icon">🎧</div>
            <p>Audio</p>
          </div>
        </Link>

        <Link to="/products/gaming" className="category-link">
          <div className="category-card">
            <div className="category-icon">🎮</div>
            <p>Gaming</p>
          </div>
        </Link>

        <Link to="/products/accesorios" className="category-link">
          <div className="category-card">
            <div className="category-icon">🔌</div>
            <p>Accesorios</p>
          </div>
        </Link>

      </div>

    </section>
  );
}

export default CategorySection;
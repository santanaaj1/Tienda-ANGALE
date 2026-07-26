import pool from "../database/connection.js";

const BASE_URL =
  process.env.BASE_URL || "http://localhost:3000";

/*
|--------------------------------------------------------------------------
| Obtener todas las categorías
|--------------------------------------------------------------------------
*/

const getCategories = async () => {

  const query = `

    SELECT
      id,
      value,
      label,
      description,
      CONCAT('${BASE_URL}/images/categories/', image) AS image

    FROM categories

    ORDER BY id;

  `;

  const result = await pool.query(query);

  return result.rows;

};

/*
|--------------------------------------------------------------------------
| Obtener una categoría por ID
|--------------------------------------------------------------------------
*/

const getCategoryById = async (id) => {

  const query = `

    SELECT
      id,
      value,
      label,
      description,
      CONCAT('${BASE_URL}/images/categories/', image) AS image

    FROM categories

    WHERE id = $1;

  `;

  const result = await pool.query(query, [id]);

  return result.rows[0];

};

export {

  getCategories,

  getCategoryById

};
import pool from "../database/connection.js";

/*
|--------------------------------------------------------------------------
| Obtener todas las marcas
|--------------------------------------------------------------------------
*/

const getBrands = async () => {

  const query = `

    SELECT
      id,
      value,
      label

    FROM brands

    ORDER BY label;

  `;

  const result = await pool.query(query);

  return result.rows;

};

/*
|--------------------------------------------------------------------------
| Obtener una marca por ID
|--------------------------------------------------------------------------
*/

const getBrandById = async (id) => {

  const query = `

    SELECT
      id,
      value,
      label

    FROM brands

    WHERE id = $1;

  `;

  const result = await pool.query(query, [id]);

  return result.rows[0];

};

export {

  getBrands,
  getBrandById

};
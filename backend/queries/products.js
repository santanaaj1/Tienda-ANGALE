import pool from "../database/connection.js";

/*
|--------------------------------------------------------------------------
| Obtener todos los productos
|--------------------------------------------------------------------------
*/

const getProducts = async () => {

  const query = `

    SELECT *

    FROM productos

    ORDER BY id;

  `;

  const result = await pool.query(query);

  return result.rows;

};

/*
|--------------------------------------------------------------------------
| Obtener un producto por ID
|--------------------------------------------------------------------------
*/

const getProductById = async (id) => {

  const query = `

    SELECT *

    FROM productos

    WHERE id = $1;

  `;

  const result = await pool.query(query, [id]);

  return result.rows[0];

};

/*
|--------------------------------------------------------------------------
| Crear un producto
|--------------------------------------------------------------------------
*/

const createProduct = async (product) => {

  const {

    nombre,
    descripcion,
    precio,
    marca,
    categoria,
    stock,
    icono

  } = product;

  const query = `

    INSERT INTO productos

    (

      nombre,
      descripcion,
      precio,
      marca,
      categoria,
      stock,
      icono

    )

    VALUES

    (

      $1,$2,$3,$4,$5,$6,$7

    )

    RETURNING *;

  `;

  const values = [

    nombre,
    descripcion,
    precio,
    marca,
    categoria,
    stock,
    icono

  ];

  const result = await pool.query(query, values);

  return result.rows[0];

};

/*
|--------------------------------------------------------------------------
| Actualizar un producto
|--------------------------------------------------------------------------
*/

const updateProduct = async (id, product) => {

  const {

    nombre,
    descripcion,
    precio,
    marca,
    categoria,
    stock,
    icono

  } = product;

  const query = `

    UPDATE productos

    SET

      nombre = $1,

      descripcion = $2,

      precio = $3,

      marca = $4,

      categoria = $5,

      stock = $6,

      icono = $7

    WHERE id = $8

    RETURNING *;

  `;

  const values = [

    nombre,
    descripcion,
    precio,
    marca,
    categoria,
    stock,
    icono,
    id

  ];

  const result = await pool.query(query, values);

  return result.rows[0];

};

/*
|--------------------------------------------------------------------------
| Eliminar un producto
|--------------------------------------------------------------------------
*/

const deleteProduct = async (id) => {

  const query = `

    DELETE

    FROM productos

    WHERE id = $1

    RETURNING *;

  `;

  const result = await pool.query(query, [id]);

  return result.rows[0];

};

export {

  getProducts,

  getProductById,

  createProduct,

  updateProduct,

  deleteProduct

};
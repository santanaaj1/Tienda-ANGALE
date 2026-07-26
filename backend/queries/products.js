import pool from "../database/connection.js";

const BASE_URL =
  process.env.BASE_URL || "http://localhost:3000";

/*
|--------------------------------------------------------------------------
| Obtener todos los productos
|--------------------------------------------------------------------------
*/

const getProducts = async () => {

  const query = `

    SELECT

      id,
      nombre,
      descripcion,
      precio,
      marca,
      categoria,
      stock,
      icono,
      CONCAT('${BASE_URL}/images/products/', image) AS image

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

    SELECT

      id,
      nombre,
      descripcion,
      precio,
      marca,
      categoria,
      stock,
      icono,
      CONCAT('${BASE_URL}/images/products/', image) AS image

    FROM productos

    WHERE id = $1;

  `;

  const result = await pool.query(query, [id]);

  return result.rows[0];

};

/*
|--------------------------------------------------------------------------
| Verificar existencia de un producto
|--------------------------------------------------------------------------
*/

const productExists = async (id) => {

  const query = `

    SELECT id

    FROM productos

    WHERE id = $1;

  `;

  const result = await pool.query(query, [id]);

  return result.rowCount > 0;

};

/*
|--------------------------------------------------------------------------
| Obtener únicamente el precio de un producto
|--------------------------------------------------------------------------
*/

const getProductPrice = async (id) => {

  const query = `

    SELECT precio

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
    icono,
    image

  } = product;

  const query = `

    INSERT INTO productos (

      nombre,
      descripcion,
      precio,
      marca,
      categoria,
      stock,
      icono,
      image

    )

    VALUES (

      $1,$2,$3,$4,$5,$6,$7,$8

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
    icono ?? "📦",
    image ?? null

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
    icono,
    image

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
      icono = $7,
      image = $8

    WHERE id = $9

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
    image,
    id

  ];

  const result = await pool.query(query, values);

  return result.rows[0];

};

/*
|--------------------------------------------------------------------------
| Descontar stock
|--------------------------------------------------------------------------
*/

const decreaseStock = async (

  id,

  quantity,

  client = pool

) => {

  const query = `

    UPDATE productos

    SET stock = stock - $2

    WHERE id = $1

    AND stock >= $2

    RETURNING *;

  `;

  const result = await client.query(

    query,

    [

      id,

      quantity

    ]

  );

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
  productExists,
  getProductPrice,
  createProduct,
  updateProduct,
  decreaseStock,
  deleteProduct

};
# 🛒 ANGALE Store

Aplicación web de comercio electrónico desarrollada con **React + Vite**, que simula una tienda online de productos tecnológicos.

El proyecto fue desarrollado como parte de un proceso de aprendizaje Full Stack, implementando una arquitectura basada en Context API, React Router y almacenamiento local mediante LocalStorage.

---

# 📸 Características

- ✅ Registro e inicio de sesión de usuarios.
- ✅ Roles de Usuario y Administrador.
- ✅ Panel de administración.
- ✅ Gestión de productos (CRUD).
- ✅ Gestión de clientes.
- ✅ Gestión de pedidos.
- ✅ Búsqueda de productos.
- ✅ Favoritos por usuario.
- ✅ Carrito de compras independiente por usuario.
- ✅ Checkout.
- ✅ Confirmación de compra.
- ✅ Actualización automática del stock después de cada compra.
- ✅ Persistencia de datos utilizando LocalStorage.
- ✅ Navegación protegida mediante rutas privadas.

---

# 🛠 Tecnologías utilizadas

- React
- Vite
- React Router DOM
- Context API
- CSS3
- JavaScript (ES6+)
- LocalStorage
- Git
- GitHub

---

# 📂 Estructura del proyecto

```
src
│
├── components
├── context
├── data
├── pages
├── services
├── styles
│
├── App.jsx
└── main.jsx
```

---

# 👤 Usuario administrador

Para acceder al panel de administración utiliza las siguientes credenciales:

**Correo**

```
admin@angale.com
```

**Contraseña**

```
123456
```

---

# 🚀 Instalación

Clonar el repositorio

```bash
git clone https://github.com/santanaaj1/Tienda-ANGALE.git
```

Entrar al proyecto

```bash
cd Tienda-ANGALE
```

Instalar dependencias

```bash
npm install
```

Ejecutar la aplicación

```bash
npm run dev
```

---

# 📋 Funcionalidades principales

## Cliente

- Registro de usuarios.
- Inicio de sesión.
- Visualización de productos.
- Búsqueda de productos.
- Favoritos.
- Carrito de compras.
- Checkout.
- Historial de pedidos.

## Administrador

- Dashboard.
- Agregar productos.
- Editar productos.
- Eliminar productos.
- Administración de clientes.
- Administración de pedidos.
- Control de stock.

---

# 💾 Persistencia

Actualmente la aplicación utiliza **LocalStorage** para almacenar:

- Usuarios
- Productos
- Pedidos
- Favoritos
- Carrito de compras
- Sesión activa

La arquitectura fue diseñada para facilitar la futura migración a un backend con Node.js, Express y PostgreSQL.

---

# 🔄 Próximas mejoras

- Backend con Node.js y Express.
- Base de datos PostgreSQL.
- API REST.
- Autenticación mediante JWT.
- Subida de imágenes de productos.
- Dashboard con estadísticas.
- Recuperación de contraseña.

---

# 👨‍💻 Autor

**Alejandro Santana**

Proyecto desarrollado como parte del programa de formación Full Stack.

---

# 📄 Licencia

Proyecto desarrollado con fines académicos y de aprendizaje.
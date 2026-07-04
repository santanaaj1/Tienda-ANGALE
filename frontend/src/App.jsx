import Header from "./components/Header";

import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import ProductDetail from "./pages/ProductDetail";
import ProductsPage from "./pages/ProductsPage";
import Favorites from "./pages/Favorites";
import SearchResults from "./pages/SearchResults";
import Profile from "./pages/Profile";

import AdminDashboard from "./pages/AdminDashboard";
import ProductsAdmin from "./pages/ProductsAdmin";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import OrdersAdmin from "./pages/OrdersAdmin";
import CustomersAdmin from "./pages/CustomersAdmin";

import NotFound from "./pages/NotFound";

import Footer from "./components/Footer";

import { Routes, Route } from "react-router-dom";

function App() {

  return (

    <>

      <Header />

      <Routes>

        {/* CLIENTE */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/checkout"
          element={
            <PrivateRoute>

              <Checkout />

            </PrivateRoute>
          }
        />

        <Route
          path="/order-confirmation"
          element={
            <PrivateRoute>

              <OrderConfirmation />

            </PrivateRoute>
          }
        />

        <Route
          path="/product/:id"
          element={<ProductDetail />}
        />

        <Route
          path="/products/:category"
          element={<ProductsPage />}
        />

        <Route
          path="/favorites"
          element={<Favorites />}
        />

        <Route
          path="/search"
          element={<SearchResults />}
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>

              <Profile />

            </PrivateRoute>
          }
        />

        {/* ADMINISTRADOR */}

        <Route
          path="/admin"
          element={
            <AdminRoute>

              <AdminDashboard />

            </AdminRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <AdminRoute>

              <ProductsAdmin />

            </AdminRoute>
          }
        />

        <Route
          path="/admin/products/add"
          element={
            <AdminRoute>

              <AddProduct />

            </AdminRoute>
          }
        />

        <Route
          path="/admin/products/edit/:id"
          element={
            <AdminRoute>

              <EditProduct />

            </AdminRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <AdminRoute>

              <OrdersAdmin />

            </AdminRoute>
          }
        />

        <Route
          path="/admin/customers"
          element={
            <AdminRoute>

              <CustomersAdmin />

            </AdminRoute>
          }
        />

        {/* 404 */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>

      <Footer />

    </>

  );

}

export default App;
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import CategoryProvider from "./context/CategoryContext";
import BrandProvider from "./context/BrandContext";
import AuthProvider from "./context/AuthContext";
import ProductProvider from "./context/ProductContext";
import FavoritesProvider from "./context/FavoritesContext";
import CartProvider from "./context/CartContext";
import SearchProvider from "./context/SearchContext";
import NotificationProvider from "./context/NotificationContext";

import Notification from "./components/Notification";

import "./styles/global.css";


ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <NotificationProvider>

    <AuthProvider>

      <ProductProvider>

        <CategoryProvider>

          <BrandProvider>

            <FavoritesProvider>

              <CartProvider>

                <SearchProvider>

                  <BrowserRouter>

                    <Notification />

                    <App />

                  </BrowserRouter>

                </SearchProvider>

              </CartProvider>

            </FavoritesProvider>

          </BrandProvider>  

      </CategoryProvider>

      </ProductProvider>

    </AuthProvider>

  </NotificationProvider>

);
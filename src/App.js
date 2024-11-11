import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Main from "./pages/Main";
import HttpError from "./pages/HttpError";
import About from "./pages/About";
import News from "./pages/News";
import Catalog from "./pages/Catalog";
import NotFound from "./pages/NotFound";
import Registration from "./pages/Registration";
import EnterPage from "./components/enterPage/EnterPage";
import UserPage from "./pages/UserPage";
import { AuthProvider } from "./context/auth-context";
import { NewsProvider } from "./context/news-context";
import { ProductsProvider } from "./context/products-context";
import ArticlePage from "./pages/ArticlePage";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import { CartProvider } from "./context/cart-context";
import Order from "./pages/Order";
import SuccessOrderPage from "./pages/SuccessOrderPage";

function App() {
  return (
    <Router>
      <ProductsProvider>
        <CartProvider>
          <NewsProvider>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<Navigate to="/main" />} />
                <Route path="/main" element={<Main />} />
                <Route path="/about" element={<About />} />
                <Route path="/news" element={<News />} />
                <Route path="/news/:newsId" element={<ArticlePage />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/catalog/:productId" element={<ProductPage />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/enter" element={<EnterPage />} />
                <Route path="/user" element={<UserPage />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/successful" element={<SuccessOrderPage />} />
                <Route path="/order" element={<Order />} />
                <Route path="/httpError" element={<HttpError />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthProvider>
          </NewsProvider>
        </CartProvider>
      </ProductsProvider>
    </Router>
  );
}

export default App;

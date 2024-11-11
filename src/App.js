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
                <Route path="/" element={<Navigate to="/cooper/main" />} />
                <Route path="/cooper/main" element={<Main />} />
                <Route path="/cooper/about" element={<About />} />
                <Route path="/cooper/news" element={<News />} />
                <Route path="/cooper/news/:newsId" element={<ArticlePage />} />
                <Route path="/cooper/catalog" element={<Catalog />} />
                <Route path="/cooper/catalog/:productId" element={<ProductPage />} />
                <Route path="/cooper/registration" element={<Registration />} />
                <Route path="/cooper/enter" element={<EnterPage />} />
                <Route path="/cooper/user" element={<UserPage />} />
                <Route path="/cooper/cart" element={<Cart />} />
                <Route path="/cooper/successful" element={<SuccessOrderPage />} />
                <Route path="/cooper/order" element={<Order />} />
                <Route path="/cooper/httpError" element={<HttpError />} />
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

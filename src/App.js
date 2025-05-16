import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import useAuthStore from "./store/authStore";

import Navbar from "./components/Navbar";
import SubNavbar from "./components/SubNavbar";
import CategoryScroller from "./components/CategoryScroller";
import ProductGrid from "./components/ProductGrid";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import AddProduct from "./pages/AddProduct";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Profile from "./pages/Profile";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import CheckoutPage from "./pages/CheckoutPage";
import CheckoutStep2 from "./pages/CheckoutStep2";
import CheckoutConfirmation from "./components/CheckoutConfirmation";

function App() {
  const fetchSessionAndProfile = useAuthStore((state) => state.fetchSessionAndProfile);
  const initAuthListener = useAuthStore((state) => state.initAuthListener);

  useEffect(() => {
    fetchSessionAndProfile();
    const subscription = initAuthListener();
    return () => subscription?.unsubscribe();
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <CategoryScroller />
              <ProductGrid />
              <Footer />
            </>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/checkout-step2" element={<CheckoutStep2 />} />
        <Route path="/confirmation" element={<CheckoutConfirmation />} />


      </Routes>
    </>
  );
}

export default App;

import { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import useAuthStore from "./store/authStore";

// imports...
import Navbar from "./components/Navbar";
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
  const navigate = useNavigate();
  const location = useLocation();

  const fetchSessionAndProfile = useAuthStore((state) => state.fetchSessionAndProfile);
  const initAuthListener = useAuthStore((state) => state.initAuthListener);
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);

  // ✅ Fetch session on first load
  useEffect(() => {
    fetchSessionAndProfile();
    const sub = initAuthListener();
    return () => sub?.unsubscribe();
  }, []);

  // ✅ Redirect to /profile only AFTER session is fetched and we're on root
  useEffect(() => {
    const hash = window.location.hash;
    const urlHasToken = hash.includes("access_token") || hash.includes("type=signup");

    if (!loading && user && location.pathname === "/" && urlHasToken) {
      console.log("✅ Redirecting after email confirmation...");
      navigate("/profile");
    }
  }, [user, loading, location.pathname, navigate]);

  return (
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
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;

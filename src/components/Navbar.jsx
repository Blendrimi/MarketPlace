import {
  FaHeart,
  FaSearch,
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";
import { supabase } from "../db/supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import SearchBar from "./SearchBar";
import useAuthStore from "../store/authStore";
import { useCartStore } from "../store/cartStore";
import { useWishlistStore } from "../store/wishListStore";

export default function Navbar() {
  const user = useAuthStore((state) => state.user);
  const profile = useAuthStore((state) => state.profile);
  const setUser = useAuthStore((state) => state.setUser);
  const setProfile = useAuthStore((state) => state.setProfile);

  const cartItems = useCartStore((state) => state.items);
  const wishlistItems = useWishlistStore((state) => state.items);
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [showWishlistDropdown, setShowWishlistDropdown] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const dropdownRef = useRef(null);
  const wishlistRef = useRef(null);
  const cartRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setOpenDropdown(false);
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        cartRef.current &&
        !cartRef.current.contains(event.target) &&
        wishlistRef.current &&
        !wishlistRef.current.contains(event.target)
      ) {
        setOpenDropdown(false);
        setShowCartDropdown(false);
        setShowWishlistDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-white shadow-sm relative">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="text-2xl font-bold text-purple-700">MarketPlace</div>

        <div className="flex items-center gap-4 w-1/2">
          <SearchBar />
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-700 relative ">
          <div className="text-right hidden md:block">
            <div className="font-semibold">Hotline 24/7</div>
            <div className="text-purple-600">(025) 3686 25 16</div>
          </div>

          <div className="relative" ref={wishlistRef}>
            <FaHeart
              className="text-gray-600 cursor-pointer"
              onClick={() => setShowWishlistDropdown((prev) => !prev)}
            />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {wishlistItems.length}
              </span>
            )}
            {showWishlistDropdown && (
              <div className="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg">
                <div className="p-4 border-b font-semibold text-sm">
                  WishList ({wishlistItems.length})
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {wishlistItems.map((item, index) => (
                    <div key={index} className="flex gap-3 items-center px-4 py-3 text-sm border-b">
                      <img
                        src={item.image_url || item.image}
                        alt={item.name}
                        className="w-14 h-14 object-contain"
                      />
                      <div>
                        <p className="font-medium leading-tight">{item.name}</p>
                        <p className="text-gray-600">€{item.price?.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/wishlist");
                    }}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
                  >
                    Go To WishList
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="relative" ref={cartRef}>
            <FaShoppingCart
              className="text-gray-600 cursor-pointer"
              onClick={() => setShowCartDropdown((prev) => !prev)}
            />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}

            {showCartDropdown && (
              <div className="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg">
                <div className="p-4 border-b font-semibold text-sm">
                  Products To Cart ({cartItems.length})
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex gap-3 items-center px-4 py-3 text-sm border-b">
                      <img
                        src={item.image_url || item.image}
                        alt={item.name}
                        className="w-14 h-14 object-contain"
                      />
                      <div>
                        <p className="font-medium leading-tight">{item.name}</p>
                        <p className="text-gray-500">Quantity: {item.quantity}</p>
                        <p className="text-sm font-semibold">
                          Price per Unit: €{item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/cart");
                    }}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
                  >
                    Go To Cart (€{cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)})
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="relative z-50" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setOpenDropdown(!openDropdown)}
              className="p-1"
            >
              <FaUser className="text-gray-700 text-lg cursor-pointer" />
            </button>

            {openDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white border shadow-lg rounded">
                {user && profile ? (
                  <>
                    <div className="px-4 py-2 text-xs text-gray-500 border-b truncate">
                      {profile.email}
                    </div>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                      onClick={() => setOpenDropdown(false)}
                    >
                      Profile
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                      onClick={() => setOpenDropdown(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                      onClick={() => setOpenDropdown(false)}
                    >
                      Register
                    </Link>
                  </>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

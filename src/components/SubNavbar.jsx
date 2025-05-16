import { FaStore, FaLock, FaFlagUsa } from "react-icons/fa";
import { Link } from "react-router-dom";  

export default function SubNavbar() {
  return (
    <div className="w-full border-t border-b py-3 bg-white px-6">
      <div className="flex items-center justify-between text-sm text-gray-700">
        <div className="flex items-center gap-6">
          <Link to="/demos" className="cursor-pointer hover:text-purple-600">
            Demos
          </Link>
          <Link to="/pages" className="cursor-pointer hover:text-purple-600">
            Pages
          </Link>
          <Link to="/products" className="cursor-pointer hover:text-purple-600">
            Products
          </Link>
          <Link to="/contact" className="cursor-pointer hover:text-purple-600">
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1 cursor-pointer hover:text-purple-600">
            <FaStore />
            <span>Sell on MarketPlace</span>
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-purple-600">
            <FaLock />
            <span>Order Tracking</span>
          </div>
          <div className="cursor-pointer hover:text-purple-600">Recently Viewed</div>
          <div className="cursor-pointer hover:text-purple-600">USD ▾</div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-purple-600">
            <FaFlagUsa />
            <span>Eng ▾</span>
          </div>
        </div>
      </div>
    </div>
  );
}

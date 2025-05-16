export default function Footer() {
    return (
      <footer className="bg-gray-50 text-gray-700 text-sm mt-16 border-t">
        {/* Top Icons Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center py-6 px-4 border-b text-xs">
          <div className="flex items-center justify-center gap-2">
            <span className="text-purple-600">🚚</span>
            <span>FREE SHIPPING OVER $99</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-purple-600">🔁</span>
            <span>30 DAYS MONEY BACK</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-purple-600">🛡️</span>
            <span>100% SECURE PAYMENT</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-purple-600">💬</span>
            <span>24/7 DEDICATED SUPPORT</span>
          </div>
        </div>
  
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 px-6 py-10 text-sm">
          {/* Logo / Contact */}
          <div>
            <h4 className="font-semibold mb-2">Swoo - Online Electronic Market</h4>
            <p className="text-gray-600 text-xs">HOTLINE 24/7</p>
            <p className="text-purple-700 font-bold">(025) 3686 25 16</p>
            <p className="mt-2 text-gray-600 text-xs">
              257 Thatcher Road St, Brooklyn, Manhattan, NY 10092
            </p>
            <p className="text-gray-600 text-xs">contact@swateletrco.com</p>
            <div className="flex gap-3 mt-4 text-xl text-gray-600">
              <span>🐦</span>
              <span>📷</span>
              <span>🎥</span>
              <span>▶️</span>
              <span>🎵</span>
            </div>
          </div>
  
          {/* Top Categories */}
          <div>
            <h4 className="font-semibold mb-2">Top Categories</h4>
            <ul className="space-y-1 text-gray-600 text-xs">
              <li>TV/Televisions</li>
              <li>Computers</li>
              <li>Laptops</li>
              <li>Mobiles & Tablets</li>
              <li>Audios</li>
              <li>Cameras</li>
              <li>Gadget</li>
              <li>Sport Equipments</li>
              <li>Office</li>
              <li>Smart Home</li>
            </ul>
          </div>
  
          {/* Company */}
          <div>
            <h4 className="font-semibold mb-2">Company</h4>
            <ul className="space-y-1 text-gray-600 text-xs">
              <li>About Swoo</li>
              <li>Contact</li>
              <li>Career</li>
              <li>Blog</li>
              <li>Sitemap</li>
              <li>Store Locations</li>
            </ul>
          </div>
  
          {/* Help Center */}
          <div>
            <h4 className="font-semibold mb-2">Help Center</h4>
            <ul className="space-y-1 text-gray-600 text-xs">
              <li>Customer Service</li>
              <li>Policy</li>
              <li>Terms & Conditions</li>
              <li>Track Order</li>
              <li>FAQs</li>
              <li>My Account</li>
              <li>Product Support</li>
            </ul>
          </div>
  
          {/* Partner */}
          <div>
            <h4 className="font-semibold mb-2">Partner</h4>
            <ul className="space-y-1 text-gray-600 text-xs">
              <li>Become Seller</li>
              <li>Affiliate</li>
              <li>Advertise</li>
              <li>Partnership</li>
            </ul>
          </div>
        </div>
  
        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4 border-t text-xs">
          <p>© 2024 <span className="font-semibold text-gray-800">Shawonetc3</span>. All Rights Reserved</p>
          <div className="flex gap-3 mt-2 md:mt-0 items-center">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-5" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/72/Klarna_Logo.svg" alt="Klarna" className="h-5" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-5" />
            <span>USD ▾</span>
            <span>🇺🇸 Eng ▾</span>
          </div>
        </div>
      </footer>
    );
  }
  
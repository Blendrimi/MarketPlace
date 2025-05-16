import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckoutConfirmation() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000); 
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Order Status</h1>

      <div className="bg-white border rounded-lg shadow p-6 text-center">
        <p className="text-lg font-medium mb-2">
          Order Date: <span className="font-normal">May 16, 2025</span>
        </p>
        <p className="text-lg font-medium mb-4">
          Estimated Delivery: <span className="font-normal">May 31 or June 2</span>
        </p>

        <div className="flex justify-between items-center max-w-md mx-auto mt-6">
          <div className="text-sm font-medium text-gray-700">Open</div>
          <div className="w-full h-2 bg-gray-200 rounded-full mx-2 relative">
            <div className="absolute left-0 h-2 bg-purple-600 rounded-full" style={{ width: "33%" }}></div>
            <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
              &#10003;
            </div>
          </div>
          <div className="text-sm font-medium text-gray-700">Processing</div>
          <div className="text-sm font-medium text-gray-400">Shipped</div>
          <div className="text-sm font-medium text-gray-400">Delivered</div>
        </div>

        <p className="mt-6 text-gray-500 text-sm">
          You will be redirected to the home page in a few seconds...
        </p>
      </div>
    </div>
  );
}

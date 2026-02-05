import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold text-green-600 mb-4">
        Order Placed Successfully 🎉
      </h2>
      <p className="mb-6">Thank you for shopping with Sarees Den</p>

      <Link
        to="/my-orders"
        className="bg-[#7b1e1e] text-white px-6 py-3 rounded"
      >
        View My Orders
      </Link>
    </div>
  );
};

export default OrderSuccess;

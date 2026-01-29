import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { addToWishlist } from "../../utils/wishlist";

const SareeCard = ({ saree }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(saree, 1);
  };

  const handleBuyNow = () => {
    addToCart(saree, 1);
    navigate("/cart");
  };

  const handleWishlist = async (e) => {
    e.stopPropagation(); 
    if (!user) {
      alert("Please login to use wishlist");
      return;
    }
    await addToWishlist(user.email, saree);
    alert("Added to wishlist ❤️");
  };

  return (
    /* flex flex-col h-full ensures cards align perfectly in the grid */
    /* Removed all borders, shadows, and rounded corners for a seamless look */
    <div className="bg-transparent flex flex-col h-full relative group transition-all duration-500">

      {/* ❤️ Minimalist Wishlist Button */}
      <button
        onClick={handleWishlist}
        className="absolute top-4 right-4 z-20 bg-white/60 backdrop-blur-md rounded-full p-2 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <span className="text-red-500 text-sm">❤️</span>
      </button>

      {/* 🖼️ High-Impact Tall Image Container 
          Applying your requested height: calc(var(--spacing) * 130)
          Removed all borders and backgrounds for the image wrapper */}
      <div 
        className="relative w-full overflow-hidden"
        style={{ height: 'calc(var(--spacing) * 130)' }}
      >
        <img
          src={saree.image}
          alt={saree.name}
          /* object-top ensures the model's face/saree drape is prioritized */
          className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
        />
      </div>

      {/* Content Section - Styled for high-end boutique aesthetic */}
      <div className="pt-8 pb-4 flex flex-col flex-grow text-center">
        
        {/* Title Container - Centered and Spaced */}
        <div className="h-12 flex items-center justify-center mb-1 px-2">
          <h3 className="font-medium text-gray-900 text-xl uppercase tracking-[0.1em] line-clamp-1">
            {saree.name}
          </h3>
        </div>

        <p className="text-[#b8860b] font-bold text-2xl mb-8">
          ₹{saree.price}
        </p>

        {/* 🔘 Aligned Action Buttons 
            mt-auto ensures these stay in a perfect horizontal line across the grid */}
        <div className="mt-auto flex flex-col gap-3 px-4 pb-4">
          <button
            onClick={handleAddToCart}
            /* Added h-12 for a taller, more prominent button */
            className="w-full h-20 bg-[#7b1e1e] text-white flex items-center justify-center text-sm font-bold uppercase tracking-[0.2em] hover:bg-black transition-all duration-300 shadow-md active:scale-95"
          >
            Add to Cart
          </button>

          <button
            onClick={handleBuyNow}
            /* Added h-12 to match the Add to Cart button exactly */
            className="w-full h-20 border-2 border-gray-800 text-gray-800 flex items-center justify-center text-sm font-bold uppercase tracking-[0.2em] hover:bg-gray-800 hover:text-white transition-all duration-300 active:scale-95"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SareeCard;
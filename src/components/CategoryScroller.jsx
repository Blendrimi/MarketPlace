import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Gaming", icon: "🎮" },
  { name: "Sport Equip", icon: "🏀" },
  { name: "Kitchen", icon: "🍳" },
  { name: "Robot Cleaner", icon: "🤖" },
  { name: "Mobiles", icon: "📱" },
  { name: "Office", icon: "💼" },
  { name: "Cameras", icon: "📷" },
  { name: "Computers", icon: "💻" },
  { name: "Televisions", icon: "📺" },
  { name: "Audios", icon: "🔊" },
];

function CategoryScroller() {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/category/${encodeURIComponent(category)}`);
  };

  return (
    <div className="w-full px-6 py-6 bg-white">
      <h2 className="text-xl font-semibold mb-4">Popular Categories</h2>
      <div className="flex overflow-x-auto gap-6 scrollbar-hide">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            onClick={() => handleCategoryClick(cat.name)}
            className="flex flex-col items-center min-w-[80px] text-center cursor-pointer"
          >
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-2xl shadow">
              {cat.icon}
            </div>
            <span className="mt-2 text-sm">{cat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryScroller;
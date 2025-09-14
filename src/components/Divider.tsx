import iconArrow from "../assets/icon-arrow.svg";

export function Divider() {
  return (
    <div className="flex items-center my-8 relative">
      <div className="flex-1 h-px bg-gray-300"></div>
      <button type="submit" className="bg-purple-500 hover:bg-purple-400 transition-colors rounded-full w-16 h-16 flex items-center justify-center absolute right-0 shadow-lg">
        <img src={iconArrow} alt="Calculate" />
      </button>
    </div>
  );
}


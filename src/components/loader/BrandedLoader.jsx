import React from "react";

const BrandedLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-pageBg">
      {/* Animated shopping cart */}
      <div className="relative w-20 h-20 animate-bounce">
        <div className="absolute inset-0 flex items-center justify-center text-4xl">
          🛒
        </div>

        {/* Falling items */}
        <div className="absolute -top-6 left-4 animate-[drop_1.5s_infinite]">
          👟
        </div>
        <div className="absolute -top-6 right-4 animate-[drop_2s_infinite]">
          🎨
        </div>
        <div className="absolute -top-6 left-1/2 animate-[drop_2.5s_infinite]">
          👜
        </div>
      </div>

      {/* Animated text shimmer */}
      <div className="mt-6 h-4 w-48 rounded bg-gray-300 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-[shimmer_2s_infinite]" />
      </div>

      <style>
        {`
          @keyframes drop {
            0% { transform: translateY(0) scale(0.5); opacity: 0; }
            50% { transform: translateY(30px) scale(1); opacity: 1; }
            100% { transform: translateY(60px) scale(0.8); opacity: 0; }
          }

          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}
      </style>
    </div>
  );
};

export default BrandedLoader;
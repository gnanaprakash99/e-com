import { useState, useEffect, useRef } from "react";

const ProductImageRotator = ({ images, name }) => {
  const isArray = Array.isArray(images);
  const imageList = isArray ? images : [images];
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const intervalRef = useRef(null);
  const holdTimeoutRef = useRef(null);

  // Function to start rotation
  const startRotation = () => {
    if (imageList.length <= 1) return;
    if (intervalRef.current) return; // Prevent multiple intervals

    intervalRef.current = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % imageList.length);
        setFade(true);
      }, 300);
    }, 2000);
  };

  // Function to stop rotation
  const stopRotation = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (holdTimeoutRef.current) {
      clearTimeout(holdTimeoutRef.current);
      holdTimeoutRef.current = null;
    }
  };

  // Clear when unmount
  useEffect(() => {
    return () => stopRotation();
  }, []);

  return (
    <div
      className="w-full h-60 bg-gray-100 flex items-center justify-center overflow-hidden cursor-pointer"
      // Desktop: hover
      onMouseEnter={startRotation}
      onMouseLeave={stopRotation}
      // Mobile: tap & hold
      onTouchStart={() => {
        holdTimeoutRef.current = setTimeout(() => {
          startRotation();
        }, 400); // 400ms = "hold"
      }}
      onTouchEnd={stopRotation}
      onTouchCancel={stopRotation}
    >
      <img
        className={`max-w-full max-h-full object-contain transition-opacity duration-500 ease-in-out ${
          fade ? "opacity-100" : "opacity-0"
        }`}
        src={imageList[index]}
        alt={name}
      />
    </div>
  );
};

export default ProductImageRotator;
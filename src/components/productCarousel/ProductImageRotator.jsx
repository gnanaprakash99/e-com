import { useState, useEffect } from "react";

const ProductImageRotator = ({ images, name }) => {
    const isArray = Array.isArray(images);
    const imageList = isArray ? images : [images];
    const [index, setIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        if (imageList.length <= 1) return;

        const interval = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setIndex((prev) => (prev + 1) % imageList.length);
                setFade(true);
            }, 500);
        }, 5000);

        return () => clearInterval(interval);
    }, [imageList.length]);

    return (
        <div className="w-full h-60 bg-gray-100 flex items-center justify-center overflow-hidden">
            <img
                className={`max-w-full max-h-full object-contain transition-opacity duration-500 ease-in-out ${fade ? "opacity-100" : "opacity-0"}`}
                src={imageList[index]}
                alt={name}
            />
        </div>
    );
};


export default ProductImageRotator;
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
                setIndex((prev) => (prev + 1) % imageList.length); // Switch image
                setFade(true); 
            }, 500); 
        }, 5000);

        return () => clearInterval(interval);
    }, [imageList.length]);

    return (
        <img
            className={`p-5 rounded-t-primaryRadius w-full text-mutedText h-60 object-cover transition-opacity duration-500 ease-in-out ${fade ? "opacity-100" : "opacity-0"}`}
            src={imageList[index]}
            alt={name}
        />
    );
};

export default ProductImageRotator;
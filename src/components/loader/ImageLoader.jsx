import React, { useState } from "react";

const ImageLoader = ({ src, alt, className }) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {/* Shimmer Skeleton */}
            {!loaded && (
                <div className="absolute inset-0 bg-gray-300 animate-pulse rounded" />
            )}

            {/* Actual Image */}
            <img
                src={src}
                alt={alt}
                onLoad={() => setLoaded(true)}
                className={`w-full h-full object-cover rounded transition-opacity duration-700 ${
                    loaded ? "opacity-100" : "opacity-0"
                }`}
            />
        </div>
    );
};

export default ImageLoader;

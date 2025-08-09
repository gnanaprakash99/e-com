import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setProductData } from "../store/slice/ProductCarouselSlice";

const useProductCarousel = () => {
    const dispatch = useDispatch();

    return useQuery({
        queryKey: ['productQuery'],
        queryFn: async () => {
            const res = await fetch("https://fakestoreapi.com/products/");
            if (!res.ok) throw new Error("Failed to fetch products");
            const data = await res.json();
            console.log('API data:', data); 
            dispatch(setProductData(data));
            return data;
        },
        select: (data) => {
            return data.map((p) => ({
                id: p.id, // ✅ use API's own ID
                name: p.title,
                category: p.category || "others",
                price: Math.round(p.price * 80), // Convert to INR
                description: p.description,
                image: [p.image], // Always make it an array
                rating: typeof p.rating === "object" ? p.rating.rate : 4.0,
            }));
        },
        onSuccess: (transformed) => {
            console.log('Transformed data:', transformed);
        },
    });
};

export default useProductCarousel;

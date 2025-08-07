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
            return res.json();
        },
        select: (data) => {
            const maxDefaultId = Math.max(...defaultProducts.map(p => p.id), 0);
            return data.map((p, i) => ({
                id: maxDefaultId + i + 1,
                name: p.title,
                category: p.category || "others",
                price: Math.round(p.price * 80),
                description: p.description,
                image: Array.isArray(p.image) ? p.image : [p.image],
                rating: typeof p.rating === "object" ? p.rating.rate : 4.0,
            }));
        },
        onSuccess: (transformed) => {
            dispatch(setProductData(transformed));
        },
    });
};

export default useProductCarousel;

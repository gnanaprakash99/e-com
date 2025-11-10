// import { useQuery } from "@tanstack/react-query";
// import { useDispatch } from "react-redux";
// import { setProductData } from "../store/slice/ProductCarouselSlice";

// const useProduct = () => {
//     const dispatch = useDispatch();

//     return useQuery({
//         queryKey: ['productQuery'],
//         queryFn: async () => {
//             const res = await fetch("https://fakestoreapi.com/products/");
//             if (!res.ok) throw new Error("Failed to fetch products");
//             const data = await res.json();
//             console.log('API data:', data); 
//             dispatch(setProductData(data));
//             return data;
//         },
//         select: (data) => {
//             return data.map((p) => ({
//                 id: p.id, // ✅ use API's own ID
//                 name: p.title,
//                 category: p.category || "others",
//                 price: Math.round(p.price * 80), // Convert to INR
//                 description: p.description,
//                 image: [p.image], // Always make it an array
//                 rating: typeof p.rating === "object" ? p.rating.rate : 4.0,
//             }));
//         },
//         onSuccess: (transformed) => {
//             console.log('Transformed data:', transformed);
//         },
//     });
// };

// export default useProduct;


import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/AxiosInstance";
import { accessToken } from "../utils/ApiRoutes";
import ApiRoutes from "../utils/ApiRoutes";

const useProduct = () => {

    // get 
    const ProductQuery = useQuery({
        queryKey: ['productQuery'],
        queryFn: async () => {
            const response = await axiosInstance.get(ApiRoutes.GET_ALL_PRODUCTS.path, {
                headers: { Authorization: `${accessToken}` },

            });
            const data = response.data;
            return data.data;
        },
        retry:false
    });

    // create
    const createdProductMutation = useMutation({
        mutationKey: ['createProduct'],
        mutationFn: async (productData) => {
            const response = await axiosInstance.post(ApiRoutes.CREATE_PRODUCT.path, productData, {
                headers: { Authorization: `${accessToken}` },
            });
            return response.data;
        },
        onSuccess: (data) => {
            console.log('Product created successfully:', data);
            ProductQuery.refetch(); // Refetch products after successful creation
        },
        onError: (error) => {
            console.error('Error creating product:', error);
        },
    });

    const updateProductMutation = useMutation({
        mutationKey: ['updateProduct'],
        mutationFn: async ({ id, updatedData }) => {
            const response = await axiosInstance.put(ApiRoutes.UPDATE_PRODUCT.path(id), updatedData);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('Product updated successfully:', data);
            ProductQuery.refetch(); // Refetch products after successful update
        },
        onError: (error) => {
            console.error('Error updating product:', error);
        },
    });

    return {
        ProductQuery,
        products: ProductQuery.data ?? [],
        createdProductMutation,
        updateProductMutation,
    }
};

export default useProduct;

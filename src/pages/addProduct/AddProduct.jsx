import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';

const AddProduct = ({ isOpen, onClose }) => {
    const [productName, setProductName] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    // getting product category
    const categories = useSelector((state) => state.productCategory.productCategory);

    if (!isOpen) return null;

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleFileCancel = () => {
        setSelectedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const product = {
            name: productName,
            category: productCategory,
            price: productPrice,
            file: selectedFile,
        };
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="w-full max-w-md bg-cardBg text-primaryText p-8 rounded-primaryRadius shadow-lg relative">
                {/* Modal Close Button */}
                <button
                    className="absolute top-4 right-4 hover:font-medium text-2xl hover:text-primaryBtn"
                    onClick={onClose}
                >
                    &times;
                </button>

                <h2 className="text-2xl font-bold mb-6 text-center">
                    Add Products
                </h2>

                <form className="space-y-4" onSubmit={handleSubmit}>

                    {/* Product Name */}
                    <input
                        type="text"
                        name="name"
                        placeholder="Product Name"
                        onChange={(e) => setProductName(e.target.value)}
                        className="w-full px-4 py-2 border border-mutedText bg-inputBg rounded-primaryRadius focus:ring-2 focus:ring-secondaryLite focus:outline-none"
                        required
                    />

                    {/* Product category */}
                    <select
                        name="category"
                        value={productCategory}
                        onChange={(e) => setProductCategory(e.target.value)}
                        className="w-full px-4 py-2 border border-mutedText bg-inputBg rounded-primaryRadius focus:ring-2 focus:ring-secondaryLite focus:outline-none"
                        required
                    >
                        <option value="" disabled>Select Category</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </option>
                        ))}
                    </select>

                    {/* Price */}
                    <input
                        type="number"
                        name="price"
                        placeholder="Product price"
                        onChange={(e) => setProductPrice(e.target.value)}
                        className="w-full px-4 py-2 border border-mutedText bg-inputBg rounded-primaryRadius focus:ring-2 focus:ring-secondaryLite focus:outline-none"
                        required
                    />

                    {/* Product Description */}
                    <textarea
                        name="description"
                        placeholder="Product Description"
                        className="w-full px-4 py-2 border border-mutedText bg-inputBg rounded-primaryRadius focus:ring-2 focus:ring-secondaryLite focus:outline-none"
                        required
                    />

                    {/* File Upload w */}
                    <div className="relative w-full">
                        <input
                            type="file"
                            name="image"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="w-full px-4 py-2 bg-inputBg rounded-primaryRadius"
                        />
                        {selectedFile && (
                            <button
                                type="button"
                                onClick={handleFileCancel}
                                className="absolute right-3 top-1/2 -translate-y-1/2 bg-inputBg text-xl font-bold hover:text-teritaryLite"
                                title="Cancel file"
                            >
                                &times;
                            </button>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="mx-auto block bg-primaryBtn text-buttonText font-semibold py-2 px-6 rounded-primaryRadius transition duration-200"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;

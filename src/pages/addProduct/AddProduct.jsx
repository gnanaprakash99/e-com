import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../store/slice/ProductCarouselSlice';


const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};

const AddProduct = ({ isOpen, onClose }) => {
    const [productName, setProductName] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const fileInputRef = useRef(null);
    const dispatch = useDispatch();

    const categories = useSelector((state) => state.productCategory.productCategory);

    if (!isOpen) return null;

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const totalFiles = selectedFiles.length + files.length;

        if (totalFiles > 10) {
            alert('You can upload up to 10 images only.');
            return;
        }

        const filesWithPreviews = files.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));

        setSelectedFiles((prev) => [...prev, ...filesWithPreviews]);
    };

    const handleFileRemove = (index) => {
        const fileToRemove = selectedFiles[index];
        URL.revokeObjectURL(fileToRemove.preview);
        const updatedFiles = [...selectedFiles];
        updatedFiles.splice(index, 1);
        setSelectedFiles(updatedFiles);
    };

    const handleClearAll = () => {
        setSelectedFiles([]);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const base64Images = await Promise.all(
            selectedFiles.map(fileObj => convertToBase64(fileObj.file))
        );

        const newProduct = {
            name: productName,
            category: productCategory,
            price: Number(productPrice),
            description: productDescription,
            images: base64Images
        };

        dispatch(addProduct(newProduct));

        // Clear form
        setProductName('');
        setProductCategory('');
        setProductPrice('');
        setProductDescription('');
        setSelectedFiles([]);
        fileInputRef.current.value = '';
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="w-full max-w-md bg-cardBg text-primaryText p-8 rounded-primaryRadius shadow-lg relative">
                <button
                    className="absolute top-4 right-4 text-2xl hover:text-cancelButton"
                    onClick={onClose}
                >
                    &times;
                </button>

                <h2 className="text-2xl font-bold mb-6 text-center">Add Products</h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Product Name"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="w-full px-4 py-2 border border-mutedText bg-inputBg rounded-primaryRadius"
                        required
                    />

                    <select
                        value={productCategory}
                        onChange={(e) => setProductCategory(e.target.value)}
                        className="w-full px-4 py-2 border border-mutedText bg-inputBg rounded-primaryRadius"
                        required
                    >
                        <option value="" disabled>Select Category</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </option>
                        ))}
                    </select>

                    <input
                        type="number"
                        placeholder="Product Price"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        className="w-full px-4 py-2 border border-mutedText bg-inputBg rounded-primaryRadius"
                        required
                    />

                    <textarea
                        placeholder="Product Description"
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        className="w-full px-4 py-2 border border-mutedText bg-inputBg rounded-primaryRadius"
                        required
                    />

                    <div className="space-y-2">
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="w-full px-4 py-2 bg-inputBg rounded-primaryRadius"
                        />
                        {selectedFiles.map((fileObj, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={fileObj.preview}
                                    alt={`preview-${index}`}
                                    className="w-16 h-16 object-cover rounded border"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleFileRemove(index)}
                                    className="absolute top-0 right-0 bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>

                    <button
                        type="submit"
                        className="mx-auto block bg-primaryBtn border-[1px] border-buttonBorder text-buttonText font-semibold py-2 px-6 rounded-primaryRadius  cursor-pointer transition-transform hover:scale-105 focus:outline-none disabled:opacity-50  transform duration-300 ease-in-out "
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
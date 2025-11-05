import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { addProduct, updateProduct } from '../../store/slice/ProductCarouselSlice';
import useProduct from '../../hooks/useProduct';

const AddProduct = ({ isOpen, onClose, editData }) => {
    const [productName, setProductName] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productStock, setProductStock] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const fileInputRef = useRef(null);
    // const dispatch = useDispatch();

    const { createdProductMutation, updateProductMutation } = useProduct();
    const categories = useSelector((state) => state.productCategory.productCategory);

    // Pre-fill data when editing
    useEffect(() => {
        if (editData) {
            setProductName(editData.name);
            setProductCategory(editData.category);
            setProductPrice(editData.price);
            setProductStock(editData.stock);
            setProductDescription(editData.description);

            // existing images (preview only)
            if (editData.image && editData.image.length > 0) {
                const previews = editData.images.map(img => ({
                    file: null,
                    preview: img, // URL or base64 string stored in DB
                    existing: true
                }));
                setSelectedFiles(previews);
            }
        }
    }, [editData]);

    if (!isOpen) return null;

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const totalFiles = selectedFiles.length + files.length;

        if (totalFiles > 10) {
            alert('Max 10 images allowed');
            return;
        }

        const filesWithPreviews = files.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));

        setSelectedFiles(prev => [...prev, ...filesWithPreviews]);
    };

    const handleFileRemove = (index) => {
        URL.revokeObjectURL(selectedFiles[index].preview);
        const updated = [...selectedFiles];
        updated.splice(index, 1);
        setSelectedFiles(updated);
    };

    const handleClearAll = () => {
        selectedFiles.forEach(f => f.preview && URL.revokeObjectURL(f.preview));
        setSelectedFiles([]);
        fileInputRef.current.value = '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create FormData
        const formData = new FormData();
        formData.append('name', productName);
        formData.append('category', productCategory);
        formData.append('price', productPrice);
        formData.append('stock', productStock);
        formData.append('description', productDescription);

        // Append only new files
        selectedFiles.forEach((fileObj) => {
            if (!fileObj.existing && fileObj.file) {
                formData.append('image', fileObj.file);
            }
        });

        if (editData) {
            // Update
            formData.append('productId', editData.id);

            await updateProductMutation.mutateAsync(formData);
            // dispatch(updateProduct({ id: editData.id, data: { productName, productCategory, productPrice, productDescription } }));

        } else {
            // Create
            await createdProductMutation.mutateAsync(formData);
            // dispatch(addProduct({ productName, productCategory, productPrice, productDescription }));
        }

        // Reset
        setProductName('');
        setProductCategory('');
        setProductPrice('');
        setProductDescription('');
        handleClearAll();
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="w-full max-w-md bg-cardBg text-primaryText p-8 rounded-primaryRadius shadow-lg relative">
                <button className="absolute top-4 right-4 text-2xl hover:text-cancelButton" onClick={onClose}>
                    &times;
                </button>

                <h2 className="text-2xl font-bold mb-6 text-center">
                    {editData ? 'Update Product' : 'Add Product'}
                </h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Product Name" value={productName}
                        onChange={(e) => setProductName(e.target.value)} className="w-full px-4 py-2 border border-mutedText bg-inputBg rounded-primaryRadius" required />

                    <select value={productCategory} onChange={(e) => setProductCategory(e.target.value)}
                        className="w-full px-4 py-2 border border-mutedText bg-inputBg rounded-primaryRadius" required>
                        <option value="" disabled>Select Category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.categoryName}>
                                {category.categoryName}
                            </option>
                        ))}
                    </select>

                    <input type="number" placeholder="Product Price" value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)} className="w-full px-4 py-2 border border-mutedText bg-inputBg rounded-primaryRadius" required />

                    <input type="number" placeholder="Product Stock" value={productStock}
                        onChange={(e) => setProductStock(e.target.value)} className="w-full px-4 py-2 border border-mutedText bg-inputBg rounded-primaryRadius" required />

                    <textarea placeholder="Product Description" value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)} className="w-full px-4 py-2 border border-mutedText bg-inputBg rounded-primaryRadius" required />

                    {/* Image Upload */}
                    <input type="file" multiple accept="image/*" ref={fileInputRef}
                        onChange={handleFileChange} className="w-full px-4 py-2 bg-inputBg rounded-primaryRadius" />

                    <div className="flex gap-2 flex-wrap mt-2">
                        {selectedFiles.map((fileObj, i) => (
                            <div key={i} className="relative">
                                <img src={fileObj.preview} className="w-16 h-16 object-cover rounded border" />
                                <button type="button" onClick={() => handleFileRemove(i)}
                                    className="absolute top-0 right-0 bg-black text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>

                    <button type="submit"
                        className="mx-auto block bg-primaryBtn text-buttonText border border-buttonBorder py-2 px-6 rounded-primaryRadius font-semibold cursor-pointer hover:scale-105 transition">
                        {editData ? 'Update' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
import React, { useState, useRef, useEffect } from 'react';
import useProduct from '../../hooks/useProduct';
import useCategory from '../../hooks/useCategory';

const AddProduct = ({ isOpen, onClose, editData }) => {
    const [productName, setProductName] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productStock, setProductStock] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const fileInputRef = useRef(null);

    const { createdProductMutation, updateProductMutation } = useProduct();
    const { categories } = useCategory();

    useEffect(() => {
        if (editData) {
            setProductName(editData.name);
            setProductCategory(editData.category); // ID
            setProductPrice(editData.price);
            setProductStock(editData.stock);
            setProductDescription(editData.description);

            if (editData.image && editData.image.length > 0) {
                const previews = editData.image.map(img => ({
                    file: null,
                    preview: img,
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
            preview: URL.createObjectURL(file),
            existing: false
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

    // Convert file to base64
    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Convert all selected files to base64
        const imagesArray = await Promise.all(
            selectedFiles.map(f => f.existing ? f.preview : fileToBase64(f.file))
        );

        const payload = {
            name: productName,
            category: productCategory,
            price: productPrice,
            stock: productStock,
            description: productDescription,
            image: imagesArray, // ✅ array of strings
        };

        try {
            if (editData) {
                await updateProductMutation.mutateAsync({ id: editData.id, updatedData: payload });
            } else {
                await createdProductMutation.mutateAsync(payload);
            }

            setProductName('');
            setProductCategory('');
            setProductPrice('');
            setProductStock('');
            setProductDescription('');
            handleClearAll();
            onClose();
        } catch (err) {
            console.error(err);
        }
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
                        {categories.filter(c => c.status === "ACTIVE").map(c => (
                            <option key={c.id} value={c.id}>{c.category_name}</option>
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

                    <input
                        type="number"
                        placeholder="Product Stock"
                        value={productStock}
                        onChange={(e) => setProductStock(e.target.value)}
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

                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="w-full px-4 py-2 bg-inputBg rounded-primaryRadius"
                    />

                    <div className="flex gap-2 flex-wrap mt-2">
                        {selectedFiles.map((f, i) => (
                            <div key={i} className="relative">
                                <img src={f.preview} className="w-16 h-16 object-cover rounded border" />
                                <button type="button" onClick={() => handleFileRemove(i)}
                                    className="absolute top-0 right-0 bg-black text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>

                    <button
                        type="submit"
                        disabled={createdProductMutation.isLoading || updateProductMutation.isLoading}
                        className="mx-auto block bg-primaryBtn text-buttonText border border-buttonBorder py-2 px-6 rounded-primaryRadius font-semibold cursor-pointer hover:scale-105 transition"
                    >
                        {editData
                            ? updateProductMutation.isPending ? 'Updating...' : 'Update'
                            : createdProductMutation.isPending ? 'Creating...' : 'Create'
                        }
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
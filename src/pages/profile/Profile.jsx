import React, { useState, useRef } from 'react';
import { MdAddPhotoAlternate } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import { addCategory, removeCategory } from '../../store/slice/ProductCategorySlice';
import { addBanner, removeBanner } from '../../store/slice/BannerCarouselSlice';
import { getPermissions } from '../../utils/UserPermission';
import IndianStates from '../../utils/IndianStates';

const Profile = () => {
    const categories = useSelector((state) => state.productCategory.productCategory);
    const bannerData = useSelector((state) => state.bannerCarouselData.bannerCarouselData);
    const dispatch = useDispatch();
    const [newCategory, setNewCategory] = useState('');
    const [showCategory, setShowCategory] = useState(false);
    const [showBannerList, setShowBannerList] = useState(false);
    const [newBanner, setNewBanner] = useState('');
    const fileInputRef = useRef(null);

    // Form data state
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        house: '',
        street: '',
        landmark: '',
        country: 'India',
        state: '',
        city: '',
        zip: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // permissions
    const permission = getPermissions();

    // File selection handler
    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setNewBanner(objectUrl);
        }
    };

    // Trigger file input click
    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    // add category
    const handleAddCategory = () => {
        const trimmed = newCategory.trim().toLowerCase();
        if (trimmed && !categories.includes(trimmed)) {
            dispatch(addCategory(trimmed));
            setNewCategory('');
        }
    };

    // delete category
    const handleDeleteCategory = (cat) => {
        dispatch(removeCategory(cat));
    };

    // show category
    const handleCategory = () => {
        setShowCategory(true);
    }

    // add banner
    const handleAddBanner = () => {
        const trimmed = newBanner.trim();
        if (trimmed) {
            dispatch(addBanner(trimmed));
            setNewBanner('');
        }
    };

    // delete banner
    const handleDeleteBanner = (id) => {
        dispatch(removeBanner(id));
    };

    return (
        <div>
            {/* Profile data */}
            <div
                className="p-4 sm:p-6 lg:p-10 relative z-30 rounded-primaryRadius border-2 border-mutedText 
                   mx-4 sm:mx-10 lg:mx-40 mt-10 sm:mt-20 mb-6 bg-cardBg"
            >
                <div className="mt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-2 sm:px-6 mb-3">
                    <h2 className="text-left text-2xl sm:text-3xl font-bold m-0">Account Settings</h2>
                    <button
                        type="submit"
                        className="px-4 sm:px-6 py-2 rounded-primaryRadius font-semibold text-sm sm:text-md bg-primaryBtn text-buttonText border border-buttonBorder cursor-pointer transition-transform hover:scale-105 focus:outline-none disabled:opacity-50"
                    >
                        Update Profile
                    </button>
                </div>

                <div className="p-2 rounded-lg sm:m-6 lg:m-10">
                    <form className='space-y-6'>
                        {/* Name & Contact */}
                        <div className="bg-cardBg rounded-primaryRadius shadow-md p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block font-medium mb-1">First Name</label>
                                    <input name="firstName" value={formData.firstName} onChange={handleChange} type="text" required className="w-full border-b-2 border-mutedText bg-transparent focus:border-inputSelectBorder focus:outline-none" />
                                </div>
                                <div>
                                    <label className="block font-medium mb-1">Last Name</label>
                                    <input name="lastName" value={formData.lastName} onChange={handleChange} type="text" required className="w-full border-b-2 border-mutedText bg-transparent focus:border-inputSelectBorder focus:outline-none" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block font-medium mb-1">Email</label>
                                    <input name="email" value={formData.email} onChange={handleChange} type="email" className="w-full border-b-2 border-mutedText bg-transparent focus:border-inputSelectBorder focus:outline-none" />
                                </div>
                                <div>
                                    <label className="block font-medium mb-1">Mobile Number</label>
                                    <input name="phone" value={formData.phone} onChange={handleChange} type="text" required className="w-full border-b-2 border-mutedText bg-transparent focus:border-inputSelectBorder focus:outline-none" />
                                </div>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="bg-cardBg rounded-primaryRadius shadow-md p-6 space-y-4">
                            <input name="house" value={formData.house} onChange={handleChange} placeholder="House no. / building name" required className="w-full border-b-2 border-mutedText bg-transparent focus:border-inputSelectBorder focus:outline-none" />
                            <input name="street" value={formData.street} onChange={handleChange} placeholder="Street name / Area" required className="w-full border-b-2 border-mutedText bg-transparent focus:border-inputSelectBorder focus:outline-none" />
                            <input name="landmark" value={formData.landmark} onChange={handleChange} placeholder="Landmark" className="w-full border-b-2 border-mutedText bg-transparent focus:border-inputSelectBorder focus:outline-none" />

                            {/* Location */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <div>
                                    <label className="block font-medium mb-1">Country</label>
                                    <select name="country" value={formData.country} onChange={handleChange} required className="w-full border-b-2 border-mutedText bg-transparent focus:border-inputSelectBorder focus:outline-none">
                                        <option value="India">India</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block font-medium mb-1">State</label>
                                    <select name="state" value={formData.state} onChange={handleChange} required className="w-full border-b-2 border-mutedText bg-transparent focus:border-inputSelectBorder focus:outline-none">
                                        {IndianStates.map(s => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block font-medium mb-1">Town/City</label>
                                    <input name="city" value={formData.city} onChange={handleChange} type="text" required className="w-full border-b-2 border-mutedText bg-transparent focus:border-inputSelectBorder focus:outline-none" />
                                </div>
                                <div>
                                    <label className="block font-medium mb-1">Zip</label>
                                    <input name="zip" value={formData.zip} onChange={handleChange} type="number" required className="w-full border-b-2 border-mutedText bg-transparent focus:border-inputSelectBorder focus:outline-none" />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* Admin only */}
            {!permission.controlPanel && (
                <div
                    className="p-3 sm:p-6 relative z-30 rounded-primaryRadius border-2 border-mutedText 
                       mx-4 sm:mx-10 lg:mx-40 mt-10 sm:mt-20 mb-6 bg-cardBg"
                >
                    <div className="mt-3 flex justify-center px-2 sm:px-6 mb-3">
                        <h2 className="text-center text-2xl sm:text-3xl font-bold m-0">Admin Control Panel</h2>
                    </div>
                    <div className="p-2 rounded-lg">
                        <form>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {/* CATEGORY MANAGEMENT */}
                                <div className="md:col-span-2">
                                    <div className="p-4 sm:p-6">
                                        <h2 className="text-xl sm:text-2xl font-bold mb-4">Manage Categories</h2>

                                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                                            <input
                                                type="text"
                                                value={newCategory}
                                                onChange={(e) => setNewCategory(e.target.value)}
                                                placeholder="New category"
                                                className="w-full border border-mutedText bg-inputBg rounded-primaryRadius p-2 shadow-sm focus:outline-none focus:ring-1 focus:ring-inputSelectBorder"
                                            />
                                            <button
                                                onClick={handleAddCategory}
                                                type="button"
                                                className="px-4 sm:px-6 py-2 bg-primaryBtn text-buttonText font-semibold rounded-primaryRadius border border-buttonBorder cursor-pointer transition-transform hover:scale-105"
                                            >
                                                Add
                                            </button>
                                            <button
                                                onClick={handleCategory}
                                                type="button"
                                                className="px-4 sm:px-6 py-2 bg-primaryBtn text-buttonText font-semibold rounded-primaryRadius border border-buttonBorder cursor-pointer transition-transform hover:scale-105"
                                            >
                                                Categories
                                            </button>
                                        </div>

                                        {/* Category list */}
                                        {showCategory && (
                                            <div
                                                className="relative"
                                                onMouseEnter={() => setShowCategory(true)}
                                                onMouseLeave={() => setShowCategory(false)}
                                            >
                                                <div className="absolute z-50 max-h-60 w-full border shadow-cardShadow border-mutedText overflow-y-auto scrollbar-hide bg-pageBg p-5 rounded-primaryRadius">
                                                    <ul className="space-y-2">
                                                        {categories.map((cat, index) => (
                                                            <li
                                                                key={index}
                                                                className="flex flex-col sm:flex-row sm:justify-between sm:items-center border border-mutedText bg-cardBg p-2 rounded-primaryRadius"
                                                            >
                                                                <span className="capitalize">{cat}</span>
                                                                <button
                                                                    onClick={() => handleDeleteCategory(cat)}
                                                                    type="button"
                                                                    className="mt-2 sm:mt-0 px-3 py-1 bg-primaryBtn text-buttonText rounded-primaryRadius border border-buttonBorder cursor-pointer transition-transform hover:scale-105"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* BANNER CAROUSEL */}
                                <div className="md:col-span-2">
                                    <div className="p-4 sm:p-6">
                                        <h2 className="text-xl sm:text-2xl font-bold mb-4">Banner Carousel</h2>
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                                            <div className="relative w-full">
                                                <input
                                                    type="text"
                                                    value={newBanner}
                                                    onChange={(e) => setNewBanner(e.target.value)}
                                                    placeholder="Enter banner URL"
                                                    className="w-full pr-10 border border-mutedText bg-inputBg rounded-primaryRadius focus:ring-1 focus:ring-inputSelectBorder focus:outline-none p-2 shadow-sm"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={triggerFileInput}
                                                    className="absolute inset-y-0 right-2 flex items-center"
                                                >
                                                    <MdAddPhotoAlternate className="w-5 h-5 text-gray-600" />
                                                </button>

                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    ref={fileInputRef}
                                                    className="hidden"
                                                    onChange={handleFileSelect}
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                className="px-4 sm:px-6 py-2 bg-primaryBtn text-buttonText font-semibold rounded-primaryRadius border border-buttonBorder cursor-pointer transition-transform hover:scale-105"
                                                onClick={handleAddBanner}
                                            >
                                                Add
                                            </button>
                                            <button
                                                type="button"
                                                className="px-4 sm:px-6 py-2 bg-primaryBtn text-buttonText font-semibold rounded-primaryRadius border border-buttonBorder cursor-pointer transition-transform hover:scale-105"
                                                onClick={() => setShowBannerList(true)}
                                            >
                                                Banners
                                            </button>
                                        </div>

                                        {/* Banner list */}
                                        {showBannerList && (
                                            <div
                                                className="relative"
                                                onMouseEnter={() => setShowBannerList(true)}
                                                onMouseLeave={() => setShowBannerList(false)}
                                            >
                                                <div className="absolute z-50 max-h-60 w-full border shadow-cardShadow border-mutedText overflow-y-auto scrollbar-hide bg-pageBg p-5 rounded-primaryRadius">
                                                    <ul className="space-y-2">
                                                        {bannerData.map((banner, index) => (
                                                            <li
                                                                key={banner.id}
                                                                className="flex flex-col sm:flex-row sm:items-center sm:justify-between border border-mutedText p-2 bg-cardBg rounded-primaryRadius"
                                                            >
                                                                <img src={banner.Imgsrc} alt={`banner-${index}`} className="w-16 h-10 object-cover rounded" />
                                                                <span className="truncate w-full sm:w-4/5">{banner.Imgsrc}</span>
                                                                <button
                                                                    onClick={() => handleDeleteBanner(banner.id)}
                                                                    type="button"
                                                                    className="mt-2 sm:mt-0 px-3 py-1 bg-primaryBtn text-buttonText rounded-primaryRadius border border-buttonBorder cursor-pointer transition-transform hover:scale-105"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>

    )
}

export default Profile

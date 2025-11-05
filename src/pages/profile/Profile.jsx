import React, { useState, useRef, useEffect } from 'react';
import { MdAddPhotoAlternate } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import { addCategory, removeCategory } from '../../store/slice/ProductCategorySlice';
import { addBanner, removeBanner } from '../../store/slice/BannerCarouselSlice';
import { getPermissions } from '../../utils/UserPermission';
import IndianStates from '../../utils/IndianStates';
import { FaUserCircle } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import useProfile from '../../hooks/useProfile';
import { adminStatus } from '../../utils/ApiRoutes';
import useAuth from '../../hooks/useAuth';

const Profile = () => {
    const dispatch = useDispatch();
    const permission = getPermissions();

    // admin status
    const isAdmin = adminStatus;

    // ✅ Get API values
    const { updateProfileMutation } = useProfile();
    // const { profileData } = useAuth();

    const profileData = {
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@email.com",
        contact_number: "+91 98765 43210",
        address_line_1: ["123", "MG Road"],
        address_line_2: [],
        city: "Bangalore",
        state: "Karnataka",
        postal_code: "560001",
        country: "India",
    }

    // ✅ Start empty, fill when API loads
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (profileData) {
            setFormData(profileData);
        }
    }, [profileData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleUpdate = () => {
        updateProfileMutation.mutate(formData, {
            onSuccess: () => {
                alert("Profile Updated Successfully");
                setIsEditing(false);
            },
            onError: () => {
                alert("Failed to update profile");
            }
        });
    };

    // CATEGORY
    const categories = useSelector((state) => state.productCategory.productCategory);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategoryImage, setNewCategoryImage] = useState('');
    const categoryFileInputRef = useRef(null);

    const [showCategory, setShowCategory] = useState(false);

    const handleCategoryFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewCategoryImage(URL.createObjectURL(file));
        }
    };

    const triggerCategoryFileInput = () => categoryFileInputRef.current?.click();

    const handleAddCategory = () => {
        if (!newCategoryName.trim()) return;
        dispatch(addCategory({
            id: Date.now().toString(36),
            categoryName: newCategoryName,
            categoryImage: newCategoryImage || "https://via.placeholder.com/150",
        }));
        setNewCategoryName('');
        setNewCategoryImage('');
    };

    const handleDeleteCategory = (id) => dispatch(removeCategory(id));

    // BANNER
    const bannerData = useSelector((state) => state.bannerCarouselData.bannerCarouselData);
    const [showBannerList, setShowBannerList] = useState(false);
    const [newBanner, setNewBanner] = useState('');
    const fileInputRef = useRef(null);

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) setNewBanner(URL.createObjectURL(file));
    };

    const triggerFileInput = () => fileInputRef.current?.click();

    const handleAddBanner = () => {
        if (!newBanner.trim()) return;
        dispatch(addBanner({ id: Date.now(), Imgsrc: newBanner }));
        setNewBanner('');
    };

    const handleDeleteBanner = (id) => dispatch(removeBanner(id));

    if (!formData || Object.keys(formData).length === 0) {
        return <p className="text-center mt-10">Loading Profile...</p>;
    }

    return (
        <div>
            {/* Profile View / Edit */}
            <div className="p-6 lg:p-10 mx-4 sm:mx-10 lg:mx-40 mt-10 rounded-primaryRadius border-2 border-mutedText bg-cardBg">
                {!isEditing ? (
                    <>
                        <div className="flex justify-between items-center border-b pb-6">
                            <div className='flex items-center gap-4'>
                                <FaUserCircle className="text-6xl text-gray-400" />
                                <h2 className="text-2xl font-semibold">
                                    {formData.firstName} {formData.lastName}
                                </h2>
                            </div>
                            <button onClick={handleEdit}
                                className="px-6 py-2 rounded-primaryRadius font-semibold bg-primaryBtn text-buttonText border border-buttonBorder hover:scale-105 transition"
                            >
                                Edit
                            </button>
                        </div>

                        <div className="mt-6 text-gray-700 space-y-2">
                            <p><MdEmail className="inline mr-1" /> {formData.email}</p>
                            <p><MdPhone className="inline mr-1" /> {formData.contact_number}</p>
                            <p>
                                <MdLocationOn className="inline mr-1" />
                                {formData.address_line_1}, {formData.address_line_2},
                                {formData.city}, {formData.state} - {formData.postal_code}
                            </p>
                        </div>

                        <div className="mt-10 flex justify-end">
                            <button className="flex items-center gap-2 text-secondaryLite border p-2 rounded-primaryRadius">
                                <FiLogOut /> Logout
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Edit Profile</h2>
                            <button onClick={handleUpdate}
                                className="px-6 py-2 rounded-primaryRadius font-semibold bg-primaryBtn text-buttonText border border-buttonBorder hover:scale-105 transition"
                            >
                                Save
                            </button>
                        </div>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input name="firstName" value={formData.firstName || ""} onChange={handleChange} placeholder="First Name" className="border-b-2 bg-transparent focus:border-inputSelectBorder outline-none" />
                                <input name="lastName" value={formData.lastName || ""} onChange={handleChange} placeholder="Last Name" className="border-b-2 bg-transparent focus:border-inputSelectBorder outline-none" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input name="email" value={formData.email || ""} onChange={handleChange} placeholder="Email" className="border-b-2 bg-transparent focus:border-inputSelectBorder outline-none" />
                                <input name="contact_number" value={formData.contact_number || ""} onChange={handleChange} placeholder="Mobile Number" className="border-b-2 bg-transparent focus:border-inputSelectBorder outline-none" />
                            </div>

                            <input name="address_line_1" value={formData.address_line_1 || ""} onChange={handleChange} placeholder="House / Street" className="border-b-2 bg-transparent focus:border-inputSelectBorder outline-none" />
                            <input name="address_line_2" value={formData.address_line_2 || ""} onChange={handleChange} placeholder="Area / Landmark" className="border-b-2 bg-transparent focus:border-inputSelectBorder outline-none" />

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <select name="country" value={formData.country || ""} onChange={handleChange} className="border-b-2 bg-transparent focus:border-inputSelectBorder outline-none">
                                    <option value="India">India</option>
                                </select>

                                <select name="state" value={formData.state || ""} onChange={handleChange} className="border-b-2 bg-transparent focus:border-inputSelectBorder outline-none">
                                    {IndianStates.map(s => <option key={s}>{s}</option>)}
                                </select>

                                <input name="city" value={formData.city || ""} onChange={handleChange} placeholder="City" className="border-b-2 bg-transparent focus:border-inputSelectBorder outline-none" />
                                <input name="postal_code" value={formData.postal_code || ""} onChange={handleChange} placeholder="Postal Code" className="border-b-2 bg-transparent focus:border-inputSelectBorder outline-none" />
                            </div>
                        </form>
                    </>
                )}
            </div>

            {isAdmin && (
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

                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                            {/* Category Name */}
                                            <input
                                                type="text"
                                                value={newCategoryName}
                                                onChange={(e) => setNewCategoryName(e.target.value)}
                                                placeholder="Category name"
                                                className="border-b-2 bg-transparent focus:border-inputSelectBorder outline-none"
                                            />

                                            {/* File Upload */}
                                            <div className="flex items-center gap-3">
                                                <button
                                                    type="button"
                                                    onClick={triggerCategoryFileInput}
                                                    className="px-4 py-2 bg-primaryBtn text-buttonText rounded-primaryRadius border border-buttonBorder hover:scale-105"
                                                >
                                                    Upload Image
                                                </button>
                                                {newCategoryImage && (
                                                    <div className="relative">
                                                        <img
                                                            src={newCategoryImage}
                                                            alt="preview"
                                                            className="w-12 h-12 object-cover rounded"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => setNewCategoryImage('')}
                                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow"
                                                        >
                                                            ✕
                                                        </button>
                                                    </div>
                                                )}
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    ref={categoryFileInputRef}
                                                    className="hidden"
                                                    onChange={handleCategoryFileSelect}
                                                />
                                            </div>

                                            {/* Action Buttons */}
                                            <div>
                                                <button
                                                    onClick={handleAddCategory}
                                                    type="button"
                                                    className="px-4 mr-4 sm:px-6 py-2 bg-primaryBtn text-buttonText font-semibold rounded-primaryRadius border border-buttonBorder hover:scale-105"
                                                >
                                                    Add
                                                </button>
                                                <button
                                                    onClick={() => setShowCategory(!showCategory)}
                                                    type="button"
                                                    className="px-4 sm:px-6 py-2 bg-primaryBtn text-buttonText font-semibold rounded-primaryRadius border border-buttonBorder hover:scale-105"
                                                >
                                                    Categories
                                                </button>
                                            </div>
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
                                                        {categories.map((cat) => (
                                                            <li
                                                                key={cat.id}
                                                                className="flex flex-col sm:flex-row sm:justify-between sm:items-center border border-mutedText bg-cardBg p-2 rounded-primaryRadius"
                                                            >
                                                                <div className="flex items-center gap-3">
                                                                    <img src={cat.categoryImage} alt={cat.categoryName} className="w-12 h-12 object-cover rounded" />
                                                                    <span className="capitalize font-medium">{cat.categoryName}</span>
                                                                </div>
                                                                <button
                                                                    onClick={() => handleDeleteCategory(cat.id)}
                                                                    type="button"
                                                                    className="mt-2 sm:mt-0 px-3 py-1 bg-primaryBtn text-buttonText rounded-primaryRadius border border-buttonBorder hover:scale-105"
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
    );
};

export default Profile;

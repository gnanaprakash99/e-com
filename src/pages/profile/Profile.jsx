import React, { useState, useRef, useEffect } from 'react';
import { MdAddPhotoAlternate } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { addCategory, removeCategory } from '../../store/slice/ProductCategorySlice';
import { addBanner, removeBanner } from '../../store/slice/BannerCarouselSlice';
import { getPermissions } from '../../utils/UserPermission';
import IndianStates from '../../utils/IndianStates';
import useProfile from '../../hooks/useProfile';
import { adminStatus } from '../../utils/ApiRoutes';
import useAuth from '../../hooks/useAuth';
import useCategory from '../../hooks/useCategory';
import useBanner from '../../hooks/useBanner';
import ImageLoader from '../../components/loader/ImageLoader';

const Profile = () => {
    const dispatch = useDispatch();
    const permission = getPermissions();

    // admin status
    const isAdmin = adminStatus;

    // email
    const email = localStorage.getItem("email") || " ";

    // API calls
    const { updateProfileMutation, profile } = useProfile();
    const { logoutMutation } = useAuth();
    const { categories, addTocategoryMutation, removeFromcategoryMutation } = useCategory();
    const { bannerData, addTobannerMutation, removeFrombannerMutation } = useBanner();

    // ✅ Start empty, fill when API loads
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (Array.isArray(profile) && profile.length > 0) {
            setFormData(profile[0]); // since your API returns [{...}]
        } else if (profile && typeof profile === 'object') {
            setFormData(profile); // in case it's already an object
        }
    }, [profile]);

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
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategoryImage, setNewCategoryImage] = useState(null);
    const categoryFileInputRef = useRef(null);
    const [showCategory, setShowCategory] = useState(false);
    const [categoryPreview, setCategoryPreview] = useState("");

    const handleCategoryFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewCategoryImage(file);
            setCategoryPreview(URL.createObjectURL(file));
        }
    };

    const triggerCategoryFileInput = () => categoryFileInputRef.current?.click();

    const handleAddCategory = () => {
        if (!newCategoryName.trim()) return;

        const formData = new FormData();
        formData.append("category_name", newCategoryName);

        if (newCategoryImage) {
            formData.append("image", newCategoryImage);
        }

        addTocategoryMutation.mutate(formData);

        setNewCategoryName('');
        setNewCategoryImage(null);
        setCategoryPreview("");
    };

    const handleDeleteCategory = (id) => removeFromcategoryMutation.mutate(id);

    // BANNER STATES 
    const [showBannerList, setShowBannerList] = useState(false);
    const [newBannerUrl, setNewBannerUrl] = useState("");
    const [newBannerFile, setNewBannerFile] = useState(null);
    const [previewBanner, setPreviewBanner] = useState("");
    const fileInputRef = useRef(null);

    const handleFileSelect = (e) => {
        const file = e?.target?.files?.[0];
        if (!file) return;
        setNewBannerFile(file);
        setPreviewBanner(URL.createObjectURL(file));
        setNewBannerUrl("");
    };

    const triggerFileInput = () => {
        if (!fileInputRef.current) return;
        fileInputRef.current.value = null;
        fileInputRef.current.click();
    };

    const handleAddBanner = () => {
        if (!newBannerFile && newBannerUrl.trim() === "") {
            console.warn("No banner to upload");
            return;
        }

        if (newBannerFile) {
            const fd = new FormData();
            fd.append("image", newBannerFile);
            for (const p of fd.entries()) console.log("FormData:", p[0], p[1]);
            addTobannerMutation.mutate(fd);
        } else {
            // URL case
            addTobannerMutation.mutate({ image: newBannerUrl });
        }

        setNewBannerFile(null);
        setPreviewBanner("");
        setNewBannerUrl("");
        if (fileInputRef.current) fileInputRef.current.value = null;
    };

    // delete banner
    const handleDeleteBanner = (id) => removeFrombannerMutation.mutate(id);

    if (!formData || Object.keys(formData).length === 0) {
        return <p className="text-center mt-10">Loading Profile...</p>;
    }

    // Handle Logout
    const handleLogout = async () => {
        try {
            await logoutMutation.mutateAsync();
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

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
                            <p><MdEmail className="inline mr-1" /> {email}</p>
                            <p><MdPhone className="inline mr-1" /> {formData.contact_number}</p>
                            <p>
                                <MdLocationOn className="inline mr-1" />
                                {formData.address_line_1}, {formData.address_line_2},
                                {formData.city}, {formData.state} - {formData.postal_code}
                            </p>
                        </div>

                        <div className="mt-10 flex justify-end">
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 text-secondaryLite border p-2 rounded-primaryRadius"
                            >
                                <FiLogOut /> Logout
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="flex text-2xl font-bold"><IoMdArrowRoundBack className='mt-1 cursor-pointer' onClick={() => setIsEditing(false)} /> Edit Profile</h2>
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
                                <input name="email" value={email || ""} onChange={handleChange} placeholder="Email" className="border-b-2 bg-transparent focus:border-inputSelectBorder outline-none" />
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
                                                {categoryPreview && (
                                                    <div className="relative inline-block">
                                                        <img
                                                            src={categoryPreview}
                                                            className="w-12 h-12 object-cover rounded"
                                                            alt="preview"
                                                        />

                                                        {/* REMOVE BUTTON */}
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setCategoryPreview("");
                                                                setNewCategoryFile(null);
                                                                categoryFileInputRef.current.value = null; // reset input
                                                            }}
                                                            className="absolute -top-2 -right-2 bg-red-600 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs shadow"
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
                                                    {addTocategoryMutation.isPending ? "Adding..." : "Add"}
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
                                                        {categories
                                                            .filter(cat => cat.status === "ACTIVE") // <-- only active categories
                                                            .map((cat) => (
                                                                <li
                                                                    key={cat.id}
                                                                    className="flex flex-col sm:flex-row sm:justify-between sm:items-center border border-mutedText bg-cardBg p-2 rounded-primaryRadius"
                                                                >
                                                                    <div className="flex items-center gap-3">
                                                                        <ImageLoader
                                                                            src={cat.image}
                                                                            alt={cat.category_name}
                                                                            className="w-12 h-12 object-cover rounded"
                                                                        />
                                                                        <span className="capitalize font-medium">{cat.category_name}</span>
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

                                        <div className="flex items-center justify-between">
                                            <div className="flex gap-3">
                                                <button
                                                    type="button"
                                                    onClick={triggerFileInput}
                                                    className="flex gap-2 px-4 py-2 bg-primaryBtn text-buttonText rounded-primaryRadius border border-buttonBorder"
                                                >
                                                    Upload Image <MdAddPhotoAlternate className="w-5 h-5" />
                                                </button>

                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    ref={fileInputRef}
                                                    className="hidden"
                                                    onChange={handleFileSelect}
                                                />

                                                {previewBanner && (
                                                    <div className="relative inline-block">
                                                        <img src={previewBanner} alt="preview" className="w-16 h-10 object-cover rounded" />
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setCategoryPreview("");
                                                                setNewCategoryImage(null);
                                                                categoryFileInputRef.current.value = null;
                                                            }}
                                                            className="absolute -top-2 -right-2 bg-red-600 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs shadow"
                                                        >
                                                            ✕
                                                        </button>
                                                    </div>
                                                )}
                                            </div>

                                            <div className=''>
                                                <button
                                                    type="button"
                                                    onClick={handleAddBanner}
                                                    className="px-4 mr-4 sm:px-6 py-2 bg-primaryBtn text-buttonText font-semibold rounded-primaryRadius border border-buttonBorder hover:scale-105"
                                                >
                                                    {addTobannerMutation?.isPending ? 'Adding...' : 'Add'}
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => setShowBannerList(!showBannerList)}
                                                    className="px-4 sm:px-6 py-2 bg-primaryBtn text-buttonText font-semibold rounded-primaryRadius border border-buttonBorder hover:scale-105"
                                                >
                                                    Banners
                                                </button>
                                            </div>
                                        </div>

                                        {/* Banner List */}
                                        {showBannerList && (
                                            <div
                                                className="relative"
                                                onMouseEnter={() => setShowBannerList(true)}
                                                onMouseLeave={() => setShowBannerList(false)}
                                            >
                                                <div
                                                    className="absolute z-50 max-h-60 w-full border shadow-cardShadow border-mutedText 
                overflow-y-auto scrollbar-hide bg-pageBg p-5 rounded-primaryRadius"
                                                >
                                                    <ul className="space-y-2">
                                                        {bannerData
                                                            ?.filter(b => b.status === "ACTIVE")
                                                            ?.map((banner) => (
                                                                <li
                                                                    key={banner.id}
                                                                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between border border-mutedText p-2 bg-cardBg rounded-primaryRadius"
                                                                >
                                                                    <ImageLoader
                                                                        src={banner.image}
                                                                        alt="banner"
                                                                        className="w-16 h-10 object-cover rounded"
                                                                    />

                                                                    <button
                                                                        onClick={() => handleDeleteBanner(banner.id)}
                                                                        type="button"
                                                                        className="px-3 py-1 bg-primaryBtn text-buttonText rounded-primaryRadius border border-buttonBorder hover:scale-105 mt-2 sm:mt-0"
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

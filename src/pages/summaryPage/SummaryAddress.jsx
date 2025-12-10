import React, { useState, useEffect } from "react";
import IndianStates from "../../utils/IndianStates";
import OrderSummary from "./OrderSummary";
import { useNavigate } from "react-router-dom";
import SummaryPageNumber from "./SummaryPageNumber";
import useShipping from "../../hooks/useShipping";
import { id } from "../../utils/ApiRoutes";
import { useSelector, useDispatch } from "react-redux";
import { setDirectBuyItem } from "../../store/slice/DirectBuySlice";
import { setCartBuy } from "../../store/slice/CartBuySlice";


const SummaryAddress = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // 🟢 API Hooks
    const { addressData, createAddressMutation } = useShipping();

    // 🟢 UI States
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [addAddress, setAddAddress] = useState(false);
    const [editId, setEditId] = useState(null);

    // 🟢 Form State
    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        phone: "",
        address_line1: "",
        address_line2: "",
        city: "",
        state: "",
        country: "India",
        postal_code: "",
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // 🟢 Handle Input Changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // 🟢 Handle Address Submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            full_name: formData.full_name,
            address_line1: formData.address_line1,
            address_line2: formData.address_line2,
            city: formData.city,
            postal_code: formData.postal_code,
            state: formData.state,
            country: formData.country,
            phone: formData.phone,
            email: formData.email,
            user: id,
        };

        try {
            await createAddressMutation.mutateAsync(payload);
            setAddAddress(false);
            setEditId(null);
            setFormData({
                full_name: "",
                email: "",
                phone: "",
                address_line1: "",
                address_line2: "",
                city: "",
                state: "",
                country: "India",
                postal_code: "",
            });
        } catch (error) {
            console.error("Error creating address:", error);
        }
    };

    const handleEdit = (addr) => {
        setEditId(addr.id);
        setAddAddress(true);
        setFormData({
            full_name: addr.full_name,
            email: addr.email,
            phone: addr.phone,
            address_line1: addr.address_line1,
            address_line2: addr.address_line2,
            city: addr.city,
            state: addr.state,
            country: addr.country,
            postal_code: addr.postal_code,
        });
    };

    const directBuyItem = useSelector((state) => state.DirectBuy.item);

    const handlePaymentProcess = () => {
        if (!selectedAddress)
            return alert("Please select a delivery address first.");

        const isDirectBuy = !!directBuyItem;

        if (isDirectBuy) {
            // DIRECT BUY FLOW — save addressId inside directBuy slice
            dispatch(
                setDirectBuyItem({
                    ...directBuyItem,
                    addressId: selectedAddress.id,
                })
            );
        } else {
            // CART FLOW — save selected address in cartBuy slice
            dispatch(setCartBuy({
                    addressId: selectedAddress.id,
                }));
        }

        navigate("/payment");
    };

    return (
        <div>
            <div className="justify-center sm:hidden">
                <SummaryPageNumber currentStep="Address" />
            </div>
            <div className="container mx-auto px-4 py-6 md:py-10">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                    {/* Address Section */}
                    <div className="w-full lg:w-2/3 bg-white p-4 sm:p-6 rounded-lg shadow">
                        <h2 className="text-xl md:text-2xl font-semibold mb-4">
                            Billing Address
                        </h2>

                        {/* Header */}
                        <div className="flex justify-between items-center my-6">
                            <h3 className="text-lg font-semibold">Select Delivery Address</h3>
                            <button
                                onClick={() => {
                                    setAddAddress((prev) => !prev);
                                    setEditId(null);
                                    setFormData({
                                        full_name: "",
                                        email: "",
                                        phone: "",
                                        address_line1: "",
                                        address_line2: "",
                                        city: "",
                                        state: "",
                                        country: "India",
                                        postal_code: "",
                                    });
                                }}
                                className="border border-buttonBorder px-4 py-2 rounded-primaryRadius bg-primaryBtn text-buttonText font-medium hover:scale-105 transition"
                            >
                                {addAddress ? "← BACK" : "+ ADD ADDRESS"}
                            </button>
                        </div>

                        {/* Address List */}
                        {!addAddress ? (
                            <div className="space-y-4">
                                {addressData && addressData.length > 0 ? (
                                    addressData.map((addr) => (
                                        <>
                                            <div
                                                key={addr.id}
                                                className={`border bg-cardBg rounded-primaryRadius shadow-md p-4 cursor-pointer 
      ${selectedAddress?.id === addr.id ? "text-primaryText border-teritaryLite border-[2px]" : ""}`}
                                                onClick={() => setSelectedAddress(addr)}
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <span className="font-semibold">{addr.full_name}</span>
                                                        <button
                                                            type="button"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleEdit(addr);
                                                            }}
                                                            className="ml-4 text-sm text-blue-600"
                                                        >
                                                            EDIT
                                                        </button>
                                                    </div>
                                                    {selectedAddress?.id === addr.id && (
                                                        <span className="text-green-600">✓</span>
                                                    )}
                                                </div>
                                                <p className="text-sm my-2">
                                                    {addr.address_line1}
                                                    {addr.address_line2 && `, ${addr.address_line2}`}, {addr.city},{" "}
                                                    {addr.state}, {addr.country} - {addr.postal_code}
                                                </p>
                                                <p className="text-sm">{`Phone: ${addr.phone}`}</p>

                                            </div>
                                        </>
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-500">No saved addresses yet.</p>
                                )}
                                <div className="flex justify-end mt-3">
                                    <button
                                        className="px-4 py-2 border border-buttonBorder bg-primaryBtn text-buttonText rounded-primaryRadius shadow hover:scale-105 transition"
                                        onClick={handlePaymentProcess}
                                    >
                                        Continue
                                    </button>
                                </div>
                            </div>
                        ) : (
                            // 🟢 New / Edit Address Form
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="bg-cardBg rounded-primaryRadius shadow-md p-6 space-y-6">
                                    <div>
                                        <label className="block font-medium mb-1">Full Name</label>
                                        <input
                                            name="full_name"
                                            value={formData.full_name}
                                            onChange={handleChange}
                                            type="text"
                                            required
                                            className="w-full border-b-2 border-mutedText bg-transparent focus:border-inputSelectBorder focus:outline-none"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block font-medium mb-1">Email</label>
                                            <input
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                type="email"
                                                className="w-full border-b-2 border-mutedText bg-transparent focus:border-inputSelectBorder focus:outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-medium mb-1">
                                                Mobile Number
                                            </label>
                                            <input
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                type="text"
                                                required
                                                className="w-full border-b-2 border-mutedText bg-transparent focus:border-inputSelectBorder focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-cardBg rounded-primaryRadius shadow-md p-6 space-y-4">
                                    <input
                                        name="address_line1"
                                        value={formData.address_line1}
                                        onChange={handleChange}
                                        placeholder="Address line 1"
                                        required
                                        className="w-full border-b-2 border-mutedText bg-transparent focus:border-inputSelectBorder focus:outline-none"
                                    />
                                    <input
                                        name="address_line2"
                                        value={formData.address_line2}
                                        onChange={handleChange}
                                        placeholder="Address line 2"
                                        className="w-full border-b-2 border-mutedText bg-transparent focus:border-inputSelectBorder focus:outline-none"
                                    />

                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                        <div>
                                            <label className="block font-medium mb-1">Country</label>
                                            <select
                                                name="country"
                                                value={formData.country}
                                                onChange={handleChange}
                                                required
                                                className="w-full border-b-2 border-mutedText bg-transparent focus:border-inputSelectBorder focus:outline-none"
                                            >
                                                <option value="India">India</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block font-medium mb-1">State</label>
                                            <select
                                                name="state"
                                                value={formData.state}
                                                onChange={handleChange}
                                                required
                                                className="w-full border-b-2 border-mutedText bg-transparent focus:border-inputSelectBorder focus:outline-none"
                                            >
                                                {IndianStates.map((s) => (
                                                    <option key={s} value={s}>
                                                        {s}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block font-medium mb-1">City</label>
                                            <input
                                                name="city"
                                                value={formData.city}
                                                onChange={handleChange}
                                                type="text"
                                                required
                                                className="w-full border-b-2 border-mutedText bg-transparent focus:border-inputSelectBorder focus:outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-medium mb-1">Zip</label>
                                            <input
                                                name="postal_code"
                                                value={formData.postal_code}
                                                onChange={handleChange}
                                                type="number"
                                                required
                                                className="w-full border-b-2 border-mutedText bg-transparent focus:border-inputSelectBorder focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="border border-buttonBorder px-6 py-3 rounded-primaryRadius bg-primaryBtn text-buttonText font-medium hover:scale-105 transition mt-4"
                                    >
                                        {editId ? "Update Address" : "Save Address"}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>

                    {/* 🧾 Order Summary */}
                    <div className="hidden sm:flex sm:justify-center w-full lg:w-1/3">
                        <OrderSummary />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SummaryAddress;
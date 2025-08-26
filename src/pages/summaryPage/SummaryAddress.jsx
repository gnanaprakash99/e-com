import React, { useState } from 'react';
import IndianStates from "../../utils/IndianStates";
import OrderSummary from './OrderSummary';
import { useNavigate } from 'react-router-dom';
import SummaryPageNumber from './SummaryPageNumber';

const SummaryAddress = ({ setStep }) => {
    const navigate = useNavigate();

    // Handle navigation to payment page
    const handlePaymentProcess = () => {
        navigate('/payment');
    };

    // Address State
    const [addresses, setAddresses] = useState([
        {
            id: 1,
            name: "Prakash",
            address: "4/305-A, Vadaktu Thotam, near Askthi Vinayagar Temple, Pachagoundenpalayam, Sulur, Coimbatore District, Tamil Nadu, 642202",
            phone: "1234567890"
        },
        {
            id: 2,
            name: "Ramesh",
            address: "12, Gandhi Street, Peelamedu, Coimbatore, Tamil Nadu, 641004",
            phone: "9876543210"
        }
    ]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [addAddress, setAddAddress] = useState(false);
    const [editId, setEditId] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        house: "",
        street: "",
        landmark: "",
        country: "India",
        state: "",
        city: "",
        zip: ""
    });

    // Handle Input Change
    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // Handle Form Submit (Add or Edit)
    const handleSubmit = (e) => {
        e.preventDefault();
        const fullName = `${formData.firstName} ${formData.lastName}`.trim();
        const fullAddress = `${formData.house}, ${formData.street}, ${formData.landmark ? formData.landmark + ", " : ""}${formData.city}, ${formData.state}, ${formData.country}, ${formData.zip}`;

        if (editId) {
            // Edit existing
            setAddresses(prev =>
                prev.map(addr =>
                    addr.id === editId
                        ? { ...addr, name: fullName, address: fullAddress, phone: formData.phone }
                        : addr
                )
            );
        } else {
            // Create new
            const newAddress = {
                id: addresses.length + 1,
                name: fullName,
                address: fullAddress,
                phone: formData.phone
            };
            setAddresses(prev => [...prev, newAddress]);
        }

        // Reset form & back to list
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            house: "",
            street: "",
            landmark: "",
            country: "India",
            state: "",
            city: "",
            zip: ""
        });
        setAddAddress(false);
        setEditId(null);
    };

    // Handle Edit Click
    const handleEdit = (addr) => {
        const [firstName, ...restName] = addr.name.split(" ");
        setFormData({
            firstName,
            lastName: restName.join(" "),
            email: "", // not stored in saved address
            phone: addr.phone,
            house: addr.address.split(",")[0]?.trim() || "",
            street: addr.address.split(",")[1]?.trim() || "",
            landmark: "",
            country: "India",
            state: "",
            city: "",
            zip: ""
        });
        setEditId(addr.id);
        setAddAddress(true);
    };

    return (
        <div className=''>
            <div className=' justify-center sm:hidden'>
                <SummaryPageNumber currentStep="Address" />
            </div>
            <div className="container mx-auto px-4 py-6 md:py-10">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">

                    {/* Billing Form / Address Selection */}
                    <div className="w-full lg:w-2/3 bg-white p-4 sm:p-6 rounded-lg shadow">
                        <h2 className="text-xl md:text-2xl font-semibold mb-4">Billing Address</h2>

                        {/* Address Section Header */}
                        <div className="flex justify-between items-center my-6">
                            <h3 className="text-lg font-semibold">Select Delivery Address</h3>
                            <button
                                onClick={() => {
                                    setAddAddress(prev => !prev);
                                    setEditId(null); // Ensure not editing
                                    setFormData({
                                        firstName: "",
                                        lastName: "",
                                        email: "",
                                        phone: "",
                                        house: "",
                                        street: "",
                                        landmark: "",
                                        country: "India",
                                        state: "",
                                        city: "",
                                        zip: ""
                                    });
                                }}
                                className="border border-buttonBorder px-4 py-2 rounded-primaryRadius bg-primaryBtn text-buttonText font-medium hover:scale-105 transition"
                            >
                                {addAddress ? "← BACK" : "+ ADD ADDRESS"}
                            </button>
                        </div>

                        {/* Existing Address List */}
                        {!addAddress ? (
                            <div className="space-y-4">
                                {addresses.map(addr => (
                                    <div
                                        key={addr.id}
                                        className={`border bg-cardBg rounded-primaryRadius shadow-md p-4 cursor-pointer ${selectedAddress?.id === addr.id ? 'border-primaryBtn' : ''}`}
                                        onClick={() => setSelectedAddress(addr)}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <span className="font-semibold">{addr.name}</span>
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
                                        <p className="text-sm my-2">{addr.address}</p>
                                        <p className="text-sm">{`Phone: ${addr.phone}`}</p>
                                        <div className="flex justify-center mt-3">
                                            <button
                                                className="px-4 py-2 border border-buttonBorder bg-primaryBtn text-buttonText rounded-primaryRadius shadow hover:scale-105 transition"
                                                onClick={handlePaymentProcess}
                                            >
                                                Deliver to this Address
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            /* New Address / Edit Form */
                            <form onSubmit={handleSubmit} className="space-y-6">
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

                    {/* Order Summary */}
                    <div className="hidden sm:flex sm:justify-center w-full lg:w-1/3">
                        <OrderSummary />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SummaryAddress;

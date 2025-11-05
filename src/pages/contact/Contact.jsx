import React, { useState } from "react";
import useContact from "../../hooks/useContact";

const Contact = () => {
  // api calls
  const { createContactMutation } = useContact();

  // form data 
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // onChange
  const handleChange = (e) => {
    setContactData({
      ...contactData,
      [e.target.name]: e.target.value,
    });
  };

  //  submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!contactData.name || !contactData.email || !contactData.message) {
      alert("Please fill all the fields");
      return;
    }

    createContactMutation.mutate(contactData, {
      onSuccess: () => {
        alert("Message sent successfully!");
        setContactData({ name: "", email: "", message: "" });
      },
      onError: (err) => {
        console.log(err);
        alert("Failed to send message. Try again.");
      },
    });
  };

  return (
    <div className="text-primaryText px-4 py-10 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">Contact Us</h1>
        <div className="w-20 mx-auto border-b-2 border-mutedText mb-8"></div>

        <form
          onSubmit={handleSubmit}
          className="bg-cardBg p-6 rounded-primaryRadius border shadow-xl"
        >
          {/* Name */}
          <div className="mb-5">
            <label htmlFor="Name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              id="Name"
              name="name"
              value={contactData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-mutedText bg-inputBg rounded-primaryRadius focus:ring-1 focus:ring-inputSelectBorder focus:outline-none"
            />
          </div>

          {/* Email */}
          <div className="mb-5">
            <label htmlFor="Email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="Email"
              name="email"
              value={contactData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              className="w-full px-4 py-2 border border-mutedText bg-inputBg rounded-primaryRadius focus:ring-1 focus:ring-inputSelectBorder focus:outline-none"
            />
          </div>

          {/* Message */}
          <div className="mb-6">
            <label htmlFor="Message" className="block text-sm font-medium mb-1">
              Message
            </label>
            <textarea
              id="Message"
              name="message"
              value={contactData.message}
              onChange={handleChange}
              rows="5"
              placeholder="Enter your message"
              className="w-full px-4 py-2 border border-mutedText bg-inputBg rounded-primaryRadius resize-none focus:ring-1 focus:ring-inputSelectBorder focus:outline-none"
            ></textarea>
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-primaryBtn text-buttonText font-bold px-6 py-2 rounded-primaryRadius border border-buttonBorder cursor-pointer transition-transform hover:scale-105 disabled:opacity-50"
              disabled={createContactMutation.isPending}
            >
              {createContactMutation.isPending ? "Sending..." : "Send"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
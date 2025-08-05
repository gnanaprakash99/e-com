import React from "react";

const Contact = () => {
  return (
    <>
      <div className="bg-[#f9f3ef] px-4 py-10 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4">Contact Us</h1>
          <div className="w-20 mx-auto border-b-2 border-gray-300 mb-8"></div>

          <form className="bg-white p-6 rounded-xl shadow-md">
            <div className="mb-5">
              <label
                htmlFor="Name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="Name"
                placeholder="Enter your name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#a36031] focus:outline-none"
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="Email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="Email"
                placeholder="name@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#a36031] focus:outline-none"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="Message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Message
              </label>
              <textarea
                id="Message"
                rows="5"
                placeholder="Enter your message"
                className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-[#a36031] focus:outline-none"
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition"
                disabled
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;

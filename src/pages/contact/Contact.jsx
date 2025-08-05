import React from "react";

const Contact = () => {
  return (
    <>
      <div className="text-primaryText px-4 py-10 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4">Contact Us</h1>
          <div className="w-20 mx-auto border-b-2 border-mutedText mb-8"></div>

          <form className="bg-cardBg p-6 rounded-primaryRadius border shadow-xl">
            <div className="mb-5">
              <label
                htmlFor="Name"
                className="block text-sm font-medium mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="Name"
                placeholder="Enter your name"
                className="w-full px-4 py-2 border border-mutedText bg-inputBg rounded-primaryRadius focus:ring-2 focus:ring-secondaryLite focus:outline-none"
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="Email"
                className="block text-sm font-medium mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="Email"
                placeholder="name@example.com"
                className="w-full px-4 py-2 border border-mutedText bg-inputBg rounded-primaryRadius focus:ring-2 focus:ring-secondaryLite focus:outline-none"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="Message"
                className="block text-sm font-medium mb-1"
              >
                Message
              </label>
              <textarea
                id="Message"
                rows="5"
                placeholder="Enter your message"
                className="w-full px-4 py-2 border border-mutedText bg-inputBg rounded-primaryRadius resize-none focus:ring-2 focus:ring-secondaryLite focus:outline-none"
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-primaryBtn text-buttonText px-6 py-2 rounded-primaryRadius transition"
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

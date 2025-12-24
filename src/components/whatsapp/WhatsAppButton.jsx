import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const phoneNumber = "916363504491"; 
  const message = "Hello, I’d like to know more about your products"; // updated text

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-6 right-6 z-50"
      aria-label="Chat on WhatsApp"
    >
      {/* Tooltip */}
      <span className="absolute right-16 top-1/2 -translate-y-1/2 scale-0 rounded bg-gray-900 px-3 py-1 text-sm text-white shadow-md transition-all group-hover:scale-100">
        Chat with us
      </span>

      {/* Button */}
      <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl">
        {/* Pulse ring */}
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-20"></span>

        <FaWhatsapp size={30} className="relative z-10" />
      </div>
    </a>
  );
};

export default WhatsAppButton;

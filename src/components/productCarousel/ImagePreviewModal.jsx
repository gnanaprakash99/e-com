import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";

const ImagePreviewModal = ({
  isOpen,
  images = [],
  currentIndex = 0,
  setCurrentIndex,
  onClose,
}) => {
  const [zoom, setZoom] = useState(1);

  const handleClose = () => {
    setZoom(1);
    onClose();
  };

  const handlePrev = () => {
    if (!images.length) return;
    setZoom(1);
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    if (!images.length) return;
    setZoom(1);
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  if (!images.length) return null; // 👈 HARD GUARD

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[999] bg-black/80 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Close */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white text-3xl"
          >
            <IoClose />
          </button>

          {/* Prev */}
          {images.length > 1 && (
            <button
              onClick={handlePrev}
              className="absolute left-4 text-white text-5xl"
            >
              ‹
            </button>
          )}

          {/* Next */}
          {images.length > 1 && (
            <button
              onClick={handleNext}
              className="absolute right-4 text-white text-5xl"
            >
              ›
            </button>
          )}

          {/* Image */}
          <div className="max-h-[90vh] max-w-[90vw] overflow-auto">
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              alt="Preview"
              style={{ transform: `scale(${zoom})` }}
              className="mx-auto transition-transform duration-300"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImagePreviewModal;
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Import images

const Carousel = ({
  img1,
  img2,
  img3,
  img4,
  img5,
}: {
  img1: string;
  img2: string;
  img3: string;
  img4: string;
  img5: string;
}) => {
  const [index, setIndex] = useState(0);

  const images = [img1, img2, img3, img4, img5];
  // Auto slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative  max-w-2xl mt-17 h-96 mx-auto overflow-hidden rounded-xl shadow-lg">
      <motion.img
        key={index}
        src={images[index]}
        alt="Vendor"
        className=" h-full w-full object-cover"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      />

      {/* Navigation Buttons */}
      <button
        onClick={() => setIndex((index - 1 + images.length) % images.length)}
        className="absolute left-2 top-1/2 bg-gray-800 text-white p-2 rounded-full"
      >
        ‹
      </button>
      <button
        onClick={() => setIndex((index + 1) % images.length)}
        className="absolute right-2 top-1/2 bg-gray-800 text-white p-2 rounded-full"
      >
        ›
      </button>
    </div>
  );
};

export default Carousel;

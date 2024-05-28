import React, { useState, useEffect, useRef } from "react";

interface ImageMagnifierProps {
  src: string;
  alt: string;
  zoomLevel?: number;
}

const ImageMagnifier: React.FC<ImageMagnifierProps> = ({
  src,
  alt,
  zoomLevel = 2,
}) => {
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
  const [magnifierVisible, setMagnifierVisible] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMagnifierPosition({ x, y });
        setMagnifierVisible(true);
      }
    };

    const handleMouseLeave = () => {
      setMagnifierVisible(false);
    };

    const imageElement = imageRef.current;
    if (imageElement) {
      imageElement.addEventListener("mousemove", handleMouseMove);
      imageElement.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (imageElement) {
        imageElement.removeEventListener("mousemove", handleMouseMove);
        imageElement.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div className="relative">
      <img ref={imageRef} src={src} alt={alt} className="w-full" />
      {magnifierVisible && (
        <div
          className="absolute border border-gray-300 rounded-md shadow-lg z-10"
          style={{
            left: magnifierPosition.x - 100,
            top: magnifierPosition.y - 100,
            width: 200,
            height: 200,
            backgroundImage: `url(${src})`,
            backgroundSize: `${zoomLevel * 100}%`,
            backgroundPosition: `-${magnifierPosition.x * zoomLevel - 100}px -${
              magnifierPosition.y * zoomLevel - 100
            }px`,
            backgroundRepeat: "no-repeat",
          }}
        />
      )}
    </div>
  );
};

export default ImageMagnifier;

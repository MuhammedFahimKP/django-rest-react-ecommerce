import React, { useState } from "react";

interface Props {
  classes: string;
  src: string;
}

const ProductMagnifier = ({ classes, src }: Props) => {
  const magnifierHeight = 100;
  const magnifieWidth = 100;
  const zoomLevel = 2;
  const [imgWidth, setImgWidth] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [[x, y], setXY] = useState([0, 0]);

  return (
    <div className="container mx-auto px-10 lg:px-0 py-10 flex items-center justify-center">
      <div className="relative  lg:w[500px] lg:h-[h-400px]   ">
        <img
          src={src}
          className={classes}
          onMouseEnter={(e) => {
            const elem = e.currentTarget;
            const { width, height } = elem.getBoundingClientRect();

            setImgWidth(width);
            setImgHeight(height);
            setShowMagnifier(true);
          }}
          onMouseMove={(e) => {
            const elem = e.currentTarget;
            const { top, left } = elem.getBoundingClientRect();
            const x = e.pageX - left - window.pageXOffset;
            const y = e.pageY - top - window.pageYOffset;
            setXY([x, y]);
          }}
          onMouseLeave={() => {
            setShowMagnifier(false);
          }}
          alt="img"
        />

        {showMagnifier && (
          <div
            className="absolute pointer-events-none background-repeat border border-gray-200 bg-white"
            style={{
              height: `${magnifierHeight}px`,
              width: `${magnifieWidth}px`,
              top: `${y - magnifierHeight / 2}px`,
              left: `${x - magnifieWidth / 2}px`,
              backgroundImage: `url('${src}')`,

              backgroundSize: `${imgWidth * zoomLevel}px ${
                imgHeight * zoomLevel
              }px`,
              backgroundPositionX: `${-x * zoomLevel + magnifieWidth / 2}px`,
              backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
            }}
          />
        )}
      </div>
    </div>
  );
};
export default ProductMagnifier;

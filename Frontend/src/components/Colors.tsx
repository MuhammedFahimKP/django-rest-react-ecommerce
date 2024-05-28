import { showALLColors } from "../utils/color";

const Colors = () => {
  const obj = showALLColors();

  return (
    <div className="w-ful">
      {Object.entries(obj).map(([key, value]) => (
        <div className="w-full  grid grid-cols-12  bg-blue-gray-700">
          <div className="flex flex-col  items-center ">
            <div
              className={`size-8 rounded-md`}
              style={{
                backgroundColor: `${value}`,
              }}
            ></div>
            <p>{key}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Colors;

import React, { ChangeEvent } from "react";

interface Props {
  onChange: (value: string) => void;
}

const SearchBox = ({ onChange }: Props) => {
  return (
    <div className="flex rounded-full bg-white border border-gray-200 shadow-md  px-2 w-full max-w-sm overflow-hidden">
      <input
        type="text"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTimeout(() => {
            onChange(e.target.value);
          }, 2000)
        }
        className="w-full bg-white flex bg-transparent pl-2 text-black outline-0 font-sans rounded-full"
        placeholder="Search Products"
      />
      <button type="submit" className="relative p-2 bg-white rounded-full">
        <svg
          width="30px"
          height="30px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth={0} />
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
              stroke="#999"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />{" "}
          </g>
        </svg>
      </button>
    </div>
  );
};

export default SearchBox;

import { useState, Fragment, type ReactNode } from "react";
import { FaCaretRight, FaCaretDown } from "react-icons/fa6";

interface Props {
  title: string;
  children: ReactNode;
  icon: ReactNode;
}

const DropDownBtn = ({ children, icon, title }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDropDown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Fragment>
      <button
        className="flex flex-row  md:hover:bg-gray-200  gap-2 items-center w-[95%]   rounded-lg text-slate-500 text-lg pl-2 py-[1px] "
        onClick={() => handleDropDown()}
      >
        {icon}
        {title}
        <p className="pl-[50%]">
          {isOpen ? <FaCaretDown /> : <FaCaretRight />}
        </p>
      </button>
      {isOpen && <ul className="bg-white w-[80%] ml-2 ">{children}</ul>}
    </Fragment>
  );
};

export default DropDownBtn;

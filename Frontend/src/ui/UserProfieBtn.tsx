import { useState } from "react";
import { RiShieldUserLine } from "react-icons/ri";

const UserProfieBtn = () => {
  const [isOpen, setOpen] = useState(false);
  console.log(isOpen);

  return (
    <div className="ralative bg-green-800">
      <button
        className="text-2xl size-10 overflow-hidden  p-1 hover:text-green-500 duration-200"
        onClick={() => setOpen(!isOpen)}
      >
        <RiShieldUserLine className="size-full" />
      </button>
      {isOpen && (
        <div
          id="userDropdown"
          className="z-10  absolute  md:right-[] bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="avatarButton"
          >
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                My Orders
              </a>
            </li>
          </ul>
          <div className="py-1">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Sign out
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfieBtn;

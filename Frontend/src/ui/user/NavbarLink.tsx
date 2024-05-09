import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  children: ReactNode;
  to: string;
}

const NavbarLink = ({ children, to }: Props) => {
  return (
    <>
      <li>
        <Link
          to={to}
          className="px-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer active"
        >
          {children}
        </Link>
      </li>
    </>
  );
};

export default NavbarLink;

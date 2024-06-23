import { Button, Menu, MenuHandler, MenuList } from "@material-tailwind/react";
import { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

const DropDownMenu = ({ title, children }: Props) => {
  return (
    <Menu
      dismiss={{
        itemPress: false,
      }}
    >
      <MenuHandler>
        <Button placeholder={undefined}>{title}</Button>
      </MenuHandler>
      <MenuList
        placeholder={undefined}
        className="border-2 z-20 max-h-60 overflow-y-scroll custom-scrollbar
        "
      >
        {children}
      </MenuList>
    </Menu>
  );
};

export default DropDownMenu;

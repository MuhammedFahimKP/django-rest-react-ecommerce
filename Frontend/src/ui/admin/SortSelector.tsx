import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { ChangeEvent, useState } from "react";

interface Props<T extends { label: string; query: string }> {
  sortChangeHandler: (prevValue: string, newValue: string) => void;
  onReset: () => void;
  sortFileds: T[];
}

function SortSelector<T extends { label: string; query: string }>({
  sortFileds,
  sortChangeHandler,
  onReset,
}: Props<T>) {
  const [sortBy, setSortBy] = useState("");

  function handleClick(e: ChangeEvent<HTMLButtonElement>) {
    if (e?.target?.value) {
      const value = e.target.value === "SortBy" ? "" : e.target.value;

      setSortBy((prev) => {
        const prevValue = prev === "SortBy" ? "" : prev;
        if (prev !== value && value) {
          sortChangeHandler(prevValue, value);
        }

        if (value === "is_active") {
          return "Published";
        }

        return value;
      });
    }
  }

  return (
    <Menu
      dismiss={{
        itemPress: false,
      }}
    >
      <MenuHandler>
        <Button placeholder={undefined}>
          {sortBy !== "" ? sortBy : "Sort By "}
        </Button>
      </MenuHandler>
      <MenuList
        placeholder={undefined}
        className="border-2 z-20 max-h-60 overflow-y-scroll custom-scrollbar
    "
      >
        <MenuItem
          placeholder={"hai"}
          onClick={() => onReset()}
          value={"SortBy"}
        >
          SortBy
        </MenuItem>

        {sortFileds.map((item, index) => (
          <MenuItem
            placeholder={`sort-item-${index}`}
            key={""}
            onClick={(e: any) => handleClick(e)}
            value={item.query}
          >
            {item.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}

export default SortSelector;

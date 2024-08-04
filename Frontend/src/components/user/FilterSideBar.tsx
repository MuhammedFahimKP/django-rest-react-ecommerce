import { useReducer } from "react";

import { useData } from "../../hooks";

import type { Brand, Categoery, Color, Size } from "../../@types/filters";

import {
  Card,
  Typography,
  List,
  ListItem,
  Checkbox,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { getAllSearchParams } from "../../utils/other-utils";

interface Props {
  setParams: (key: string, value: string) => void;
  removeParams: (key: string, value: string) => void;
  clearItem: (key: string) => void;
  resetAll: () => void;
  searchParams: URLSearchParams;
}

const FilterSideBar = ({
  setParams,
  removeParams,
  searchParams,
  clearItem,
  resetAll,
}: Props) => {
  interface Opener {
    brand: boolean;
    categoery: boolean;
    size: boolean;
    color: boolean;
  }

  type OpenerActionType =
    | "handle-brand"
    | "handle-color"
    | "handle-size"
    | "handle-categoery";

  function openerReducer(state: Opener, action: { type: OpenerActionType }) {
    switch (action.type) {
      case "handle-categoery": {
        return { ...state, categoery: !state.categoery };
      }

      case "handle-brand": {
        return { ...state, brand: !state.brand };
      }

      case "handle-color": {
        return { ...state, color: !state.color };
      }

      case "handle-size": {
        return { ...state, size: !state.size };
      }
      default:
        return state;
    }
  }

  const [opener, dispatch] = useReducer(openerReducer, {
    brand: false,
    categoery: false,
    size: false,
    color: false,
  });

  const checkedOrNot = (key: string, value: string) => {
    if (
      searchParams.has(key) &&
      searchParams?.get(key)?.split(",").includes(value)
    ) {
      return true;
    }

    return false;
  };
  const onFilterClick = (key: string, value: string) => {
    searchParams.get(key)?.split(",").includes(value)
      ? removeParams(key, value)
      : setParams(key, value);
  };

  const { data: brands } = useData<Brand>("shop/brand/");
  const { data: catgories } = useData<Categoery>("shop/categoery/");
  const { data: sizes } = useData<Size>("shop/size/");
  const { data: colors } = useData<Color>("shop/color/");

  return (
    <Card
      placeholder={"sidebar"}
      className="p-4 shadow-xl z-50  min-h-screen   top-0 shadow-blue-gray-900/5 border-r-2 border-gray-200  "
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="mb-2 p-4">
        <Typography
          placeholder={"sidebar heading"}
          variant="lead"
          color="blue-gray"
        >
          Filters
        </Typography>
      </div>

      {Object.keys(getAllSearchParams(searchParams)).length > 1 && (
        <button
          className="my-5  font-ubuntu px-4 py-2 bg-white text-black"
          onClick={resetAll}
        >
          Reset Filters
        </button>
      )}
      <List placeholder={"sidebar-menu"}>
        <Accordion
          placeholder={"sidebar-menu-accordian"}
          open={opener.categoery}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                opener.categoery === true ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem
            className="p-0"
            selected={opener.categoery === true}
            placeholder={"sidebar-menu-item"}
          >
            <AccordionHeader
              onClick={() => dispatch({ type: "handle-categoery" })}
              className="border-b-0 p-3"
              placeholder={undefined}
            >
              <Typography
                color="blue-gray"
                className="mr-auto font-normal"
                placeholder={undefined}
              >
                Categoery
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1  overflow-y-scroll max-h-72 mt-4 mb-4  no-scrollbar  bg-gray-200 rounded-md  ">
            <div className="grid gird-cols-1  mt-2 ">
              {catgories.map(({ name }) => (
                <Checkbox
                  crossOrigin={true}
                  checked={checkedOrNot("category", name)}
                  label={name}
                  onClick={() => onFilterClick("category", name)}
                />
              ))}

              {catgories.length > 1 && (
                <button
                  onClick={() => clearItem("category")}
                  className="px-4 py-2 text-black bg-gray-200"
                >
                  Remove All
                </button>
              )}
            </div>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={opener.brand}
          placeholder={undefined}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                opener.brand === true ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem
            className="p-0"
            selected={opener.brand == true}
            placeholder={undefined}
          >
            <AccordionHeader
              onClick={() => dispatch({ type: "handle-brand" })}
              className="border-b-0 p-3"
              placeholder={undefined}
            >
              <Typography
                color="blue-gray"
                className="mr-auto font-normal"
                placeholder={undefined}
              >
                Brand
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1  overflow-y-scroll max-h-72 mt-4 mb-4  no-scrollbar  bg-gray-200 rounded-md  ">
            <div className="grid gird-cols-1  mt-2 ">
              {brands.map(({ name }) => (
                <Checkbox
                  crossOrigin={true}
                  checked={checkedOrNot("brand", name)}
                  label={name}
                  onClick={() => onFilterClick("brand", name)}
                />
              ))}

              {brands.length > 1 && (
                <button
                  onClick={() => clearItem("brand")}
                  className="px-4 py-2 text-black bg-gray-200 "
                >
                  Remove All
                </button>
              )}
            </div>
          </AccordionBody>
        </Accordion>

        <Accordion
          open={opener.size}
          placeholder={undefined}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                opener.size === true ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem
            className="p-0"
            selected={opener.size}
            placeholder={undefined}
          >
            <AccordionHeader
              onClick={() => dispatch({ type: "handle-size" })}
              className="border-b-0 p-3"
              placeholder={undefined}
            >
              <Typography
                color="blue-gray"
                className="mr-auto font-normal"
                placeholder={undefined}
              >
                Size
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1  overflow-y-scroll max-h-72 mt-4 mb-4  no-scrollbar  bg-gray-200 rounded-md  ">
            <div className="grid gird-cols-1  mt-2 ">
              {sizes.map(({ name }) => (
                <Checkbox
                  crossOrigin={true}
                  checked={checkedOrNot("size", name)}
                  label={name}
                  onClick={() => onFilterClick("size", name)}
                />
              ))}

              {sizes.length > 1 && (
                <button
                  onClick={() => clearItem("size")}
                  className="px-4 py-2 text-black bg-gray-200 "
                >
                  Remove All
                </button>
              )}
            </div>
          </AccordionBody>
        </Accordion>

        <Accordion
          open={opener.color}
          placeholder={undefined}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                opener.color === true ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem
            className="p-0"
            selected={opener.color == true}
            placeholder={undefined}
          >
            <AccordionHeader
              onClick={() => dispatch({ type: "handle-color" })}
              className="border-b-0 p-3"
              placeholder={undefined}
            >
              <Typography
                color="blue-gray"
                className="mr-auto font-normal"
                placeholder={undefined}
              >
                Color
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1  overflow-y-scroll max-h-72 mt-4 mb-4  no-scrollbar  bg-gray-200 rounded-md  ">
            <div className="grid gird-cols-1  mt-2 ">
              {colors.map(({ name }) => (
                <Checkbox
                  crossOrigin={true}
                  checked={checkedOrNot("color", name)}
                  label={name}
                  onClick={() => onFilterClick("color", name)}
                />
              ))}

              {colors.length > 1 && (
                <button
                  onClick={() => clearItem("color")}
                  className="px-4 py-2 text-black bg-gray-200 "
                >
                  Remove All
                </button>
              )}
            </div>
          </AccordionBody>
        </Accordion>
      </List>
    </Card>
  );
};

export default FilterSideBar;

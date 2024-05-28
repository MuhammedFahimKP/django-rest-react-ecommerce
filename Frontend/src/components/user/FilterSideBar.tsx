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
import { useReducer } from "react";

const FilterSideBar = () => {
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
    brand: true,
    categoery: true,
    size: true,
    color: true,
  });

  return (
    <Card
      placeholder={"sidebar"}
      className=" rounded-none  w-full h-full p-4 shadow-xl  top-0 shadow-blue-gray-900/5 border-r-2 border-gray-200  "
    >
      <div className="mb-2 p-4">
        <Typography
          placeholder={"sidebar heading"}
          variant="h5"
          color="blue-gray"
        >
          Filters
        </Typography>
      </div>
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
              <Checkbox crossOrigin={true} defaultChecked label="Categoery" />
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
              <Checkbox crossOrigin={true} defaultChecked label="Categoery" />
              <Checkbox crossOrigin={true} defaultChecked label="Categoery" />
              <Checkbox crossOrigin={true} defaultChecked label="Categoery" />
              <Checkbox crossOrigin={true} defaultChecked label="Categoery" />
              <Checkbox crossOrigin={true} defaultChecked label="Categoery" />
              <Checkbox crossOrigin={true} defaultChecked label="Categoery" />
              <Checkbox crossOrigin={true} defaultChecked label="Categoery" />
              <Checkbox crossOrigin={true} defaultChecked label="Categoery" />
              <Checkbox crossOrigin={true} defaultChecked label="Categoery" />
              <Checkbox crossOrigin={true} defaultChecked label="Categoery" />
              <Checkbox crossOrigin={true} defaultChecked label="Categoery" />
              <Checkbox crossOrigin={true} defaultChecked label="Categoery" />
              <Checkbox crossOrigin={true} defaultChecked label="Categoery" />
              <Checkbox crossOrigin={true} defaultChecked label="Categoery" />
              <Checkbox crossOrigin={true} defaultChecked label="Categoery" />
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
              <Checkbox crossOrigin={true} defaultChecked label="Categoery" />
              <Checkbox crossOrigin={true} defaultChecked label="Categoery" />
              <Checkbox crossOrigin={true} defaultChecked label="Categoery" />
              <Checkbox crossOrigin={true} defaultChecked label="Categoery" />
              <Checkbox crossOrigin={true} defaultChecked label="Categoery" />
              <Checkbox crossOrigin={true} defaultChecked label="Categoery" />
              <Checkbox crossOrigin={true} defaultChecked label="Categoery" />
              <Checkbox crossOrigin={true} defaultChecked label="Categoery" />
              <Checkbox crossOrigin={true} defaultChecked label="Categoery" />
              <Checkbox crossOrigin={true} defaultChecked label="Categoery" />
              <Checkbox crossOrigin={true} defaultChecked label="Categoery" />
              <Checkbox crossOrigin={true} defaultChecked label="Categoery" />
              <Checkbox crossOrigin={true} defaultChecked label="Categoery" />
              <Checkbox crossOrigin={true} defaultChecked label="Categoery" />
              <Checkbox crossOrigin={true} defaultChecked label="Categoery" />
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
              <Checkbox crossOrigin={true} defaultChecked label="Categoery" />
              <Checkbox crossOrigin={true} defaultChecked label="Categoery" />
              <Checkbox crossOrigin={true} defaultChecked label="Categoery" />
              <Checkbox crossOrigin={true} defaultChecked label="Categoery" />
              <Checkbox crossOrigin={true} defaultChecked label="Categoery" />
              <Checkbox crossOrigin={true} defaultChecked label="Categoery" />
              <Checkbox crossOrigin={true} defaultChecked label="Categoery" />
              <Checkbox crossOrigin={true} defaultChecked label="Categoery" />
              <Checkbox crossOrigin={true} defaultChecked label="Categoery" />
              <Checkbox crossOrigin={true} defaultChecked label="Categoery" />
              <Checkbox crossOrigin={true} defaultChecked label="Categoery" />
              <Checkbox crossOrigin={true} defaultChecked label="Categoery" />
              <Checkbox crossOrigin={true} defaultChecked label="Categoery" />
              <Checkbox crossOrigin={true} defaultChecked label="Categoery" />
              <Checkbox crossOrigin={true} defaultChecked label="Categoery" />
            </div>
          </AccordionBody>
        </Accordion>
      </List>
    </Card>
  );
};

export default FilterSideBar;

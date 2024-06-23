import { getState } from "../store";

const { access } = getState().persistedReducer.auth;

const VALID_FILE_EXTENTIONS = {
  image: ["jpg", "gif", "png", "jpeg", "svg", "webp"],
};

const FILE_REQUEST_CONFIG = {
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: "Bearer " + access,
  },
};

interface LinkType {
  to: string;
  text: string;
}

interface AdminProductSortProps {
  label: string;
  query: string;
}

const navlinks: LinkType[] = [
  {
    to: "/",
    text: "Home",
  },
  {
    to: "/signup",
    text: "Collections",
  },
  {
    to: "/signin",
    text: "About",
  },
  {
    to: "/signin",
    text: "SignIn",
  },
];

const AdminProductSortData: AdminProductSortProps[] = [
  {
    label: "Created",
    query: "created",
  },
  {
    label: "Name",
    query: "name",
  },
  {
    label: "Updated",
    query: "updated",
  },
  {
    label: "Active",
    query: "active",
  },
];

export { VALID_FILE_EXTENTIONS, FILE_REQUEST_CONFIG };
export { navlinks, AdminProductSortData };

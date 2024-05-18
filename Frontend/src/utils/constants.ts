import {getState} from "../store/index"


const { access } = getState().persistedReducer.auth

const VALID_FILE_EXTENTIONS = { image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'] };

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


export {VALID_FILE_EXTENTIONS,FILE_REQUEST_CONFIG}  
export {navlinks};
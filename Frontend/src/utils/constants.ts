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

export {navlinks};
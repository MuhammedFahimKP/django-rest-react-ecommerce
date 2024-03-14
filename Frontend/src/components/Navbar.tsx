import NavbarLink from "../ui/NavbarLink";

interface LinkType {
  path: string;
  text: string;
}

const navlinks: LinkType[] = [
  {
    path: "index.html",
    text: "Home",
  },
  {
    path: "abou.html",
    text: "About",
  },
];

export default function Navbar() {
  return (
    <div className={"bg-teal-400  rounded-xl mt-3 h-16  p-3"}>
      <ul className={"flex" + " bg-amber-500" + " justify-around"}>
        {navlinks.map((link: LinkType) => (
          <li
            className={
              "text-center text-white " + " font-mono " + " font-bold "
            }
            key={link.text}
          >
            <NavbarLink linkText={link.text} linkURL={link.path} />
          </li>
        ))}
      </ul>
    </div>
  );
}

interface Props {
  linkText: string;
  linkURL: string;
}

const NavbarLink = ({ linkText, linkURL }: Props) => {
  return (
    <a href={linkURL} onClick={(e) => e.preventDefault()}>
      {linkText}
    </a>
  );
};

export default NavbarLink;

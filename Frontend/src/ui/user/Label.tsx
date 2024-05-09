interface Props {
  htmlFor: string;
  children: string;
}

const Label = ({ htmlFor, children }: Props) => {
  return (
    <label
      className="block  text-gray-500 ml-2  text-sm font-mono  font-bold mb-1"
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
};

export default Label;

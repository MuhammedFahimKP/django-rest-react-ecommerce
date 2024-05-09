interface Props {
  children: any;
}

const ErrorText = ({ children }: Props) => {
  return <p className="text-sm mt-1  px-2 text-red-500  ">{children}</p>;
};

export default ErrorText;

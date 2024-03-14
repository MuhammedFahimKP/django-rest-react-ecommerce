interface Props {
  children: string;
  disabled: Boolean;
}

export default function SubmitBtn({ children, disabled }: Props) {
  return disabled ? (
    <button
      type="submit"
      {...disabled}
      className="text-white bg-gradient-to-br mt-2 w-full from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-md  opacity-60 lg:text-lg  px-5 py-2.5 text-center me-2 mb-2"
    >
      {children}
    </button>
  ) : (
    <button
      type="submit"
      className="text-white bg-gradient-to-br mt-2 w-full from-purple-600 to-blue-500 hover:bg-gradient-to-bl  focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-md  lg:text-lg  px-5 py-2.5 text-center me-2 mb-2"
    >
      {children}
    </button>
  );
}

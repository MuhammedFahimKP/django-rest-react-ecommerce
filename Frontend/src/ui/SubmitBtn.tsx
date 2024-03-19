interface Props {
  children: string;
  disabled: Boolean;
}

export default function SubmitBtn({ children }: Props) {
  return (
    <button
      type="submit"
      className="bg-black text-white hover:opacity-60 duration-[2000ms]  mt-1 w-full  font-medium rounded-lg text-md  lg:text-lg  px-5 py-2.5 text-center me-2 mb-2"
    >
      {children}
    </button>
  );
}

import { ReactNode } from "react";
interface Props {
  children: ReactNode;
}

const FormRow = ({ children }: Props) => {
  return (
    <section className="flex items-center justify-between mt-1 py-1  w-full ">
      {children}
    </section>
  );
};

export default FormRow;

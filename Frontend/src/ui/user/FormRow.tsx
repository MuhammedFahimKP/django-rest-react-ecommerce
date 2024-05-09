import { ReactNode } from "react";
interface Props {
  children: ReactNode;
}

const FormRow = ({ children }: Props) => {
  return (
    <section className="flex  items-center justify-center gap-2   w-full ">
      {children}
    </section>
  );
};

export default FormRow;

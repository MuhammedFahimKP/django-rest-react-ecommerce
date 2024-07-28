import Lottie from "lottie-react";
import emptyCartAnimation from "../../assets/lotties/emptyCartLottie.json";

interface Props {
  context: string;
}

const EmpytBag = ({ context }: Props) => {
  return (
    <div className="w-full mt-36 mx-auto  flex flex-col items-center ">
      <Lottie className="size-72 " animationData={emptyCartAnimation} />
      <h1 className="text-2xl mt-4  font-ubuntu">{context}</h1>
    </div>
  );
};

export default EmpytBag;

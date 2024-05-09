import { ReactNode, useEffect } from "react";
import { useScrollBlock } from "../../hooks/useScroll";
import { AiOutlineClose } from "react-icons/ai";
type Redirection = {
  path: string;
  text: string;
};

interface Props {
  icon: ReactNode;
  enterLink: Redirection;
  exitLink?: Redirection;
  children: string;
  dismiss: () => void;
}

const Dailog = ({ icon, children, dismiss, enterLink, exitLink }: Props) => {
  const { blockScroll, allowScroll } = useScrollBlock();

  useEffect(() => {
    blockScroll();
    return () => allowScroll();
  }, []);

  return (
    <div
      id="popup-modal"
      className="absolute z-50 w-full bg-black/80 top-0 left-0 right-0 bottom-0 flex items-center justify-center"
    >
      <div className="relative bg-white    w-[20%]  rounded-3xl shadow ">
        <button
          type="button"
          onClick={() => dismiss()}
          className="absolute top-3 end-2.5 text-gray-400 bg-transparent transition-all  hover:text-red-600  rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
          data-modal-hide="popup-modal"
        >
          <AiOutlineClose className="w-5 h-5" />
        </button>
        <div className="p-4 md:p-5 text-center">
          {icon}
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {children}
          </h3>

          <button
            data-modal-hide="popup-modal"
            type="button"
            className="py-2.5 px-5 me-3 text-md font-medium bg-black text-white rounded-lg hover:opacity-60  transition-all "
          >
            {enterLink.text}
          </button>
          {exitLink && (
            <button
              data-modal-hide="popup-modal"
              type="button"
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-md inline-flex items-center px-5 py-2.5 text-center"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dailog;

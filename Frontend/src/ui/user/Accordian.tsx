import { ReactNode, useEffect, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface Props {
  children: ReactNode;
  title: string;
  opener: boolean;

  rightElement?: ReactNode;
}

const Accordian = ({ title, children, opener, rightElement }: Props) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(opener);
  }, [opener]);

  return (
    <div className="bg-white     md:w-[60vw] p-4 text-black ">
      <motion.div
        initial={false}
        onClick={() => opener && setOpen(!open)}
        className="flex flex-col   items-center mb-2  justify-center transition-all duration-1000"
      >
        <div className="flex  items-center   justify-between w-full">
          <h2 className="text-xl font-semibold">{title}</h2>

          {rightElement ? (
            rightElement
          ) : (
            <button className="text-black hover:text-gray-400">
              {open ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          )}
        </div>
        <div className="h-[1px] w-full  mt-4 mb-2  bg-black  "> </div>
      </motion.div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="flex flex-col gap-4 mx-5"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{
              duration: 0.4,
              ease: [0.04, 0.62, 0.23, 0.98],
            }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Accordian;

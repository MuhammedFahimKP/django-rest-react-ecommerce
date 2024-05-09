import ReactPaginate from "react-paginate";
import { motion } from "framer-motion";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const PaginationButtons = () => {
  const paginationVariants = {
    hidden: {
      opacity: 0,
      y: 100,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        dumping: 20,
      },
    },
  };

  return (
    <motion.div
      variants={paginationVariants}
      initial="hidden"
      animate="visible"
    >
      <ReactPaginate
        breakLabel={<span className="mr-4">....</span>}
        nextLabel={
          <span className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-md ">
            <BsChevronRight />
          </span>
        }
        // onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={20}
        previousLabel={
          <span className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-md ">
            <BsChevronLeft />
          </span>
        }
        containerClassName="flex items-center justify-center mt-8 mb-4"
        renderOnZeroPageCount={null}
        pageClassName="block 
        border-gray-200 hover:bg-blue-600 w-10 hover:text-white h-10 flex  items-center justify-center rounded-md"
      />
    </motion.div>
  );
};

export default PaginationButtons;

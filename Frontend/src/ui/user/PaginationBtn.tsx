interface Props {
  onNext: () => void;
  onPrev: () => void;
  totalPages: number;
  currentPage: number;
}

const PaginationBtn = ({ currentPage, totalPages, onNext, onPrev }: Props) => {
  return (
    <>
      {/* Hello world */}
      <div className="flex flex-col items-center">
        {/* Help text */}
        <span className="text-sm text-gray-700 dark:text-gray-400">
          <span className="font-semibold text-gray-900 dark:text-white">
            Page {totalPages !== 0 ? currentPage : 0}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {totalPages}
          </span>{" "}
        </span>
        {/* Buttons */}
        <div className="inline-flex mt-2 xs:mt-0">
          <button
            className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-black rounded-s  hover:opacity-95"
            onClick={onPrev}
          >
            Prev
          </button>
          <button
            onClick={onNext}
            className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-black rounded-e hover:opacity-95 "
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default PaginationBtn;

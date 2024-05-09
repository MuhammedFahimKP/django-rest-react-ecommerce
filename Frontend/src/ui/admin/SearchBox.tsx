import { FormEvent, useRef } from "react";

interface Props {
  onSearch: (search: string) => void;
}

const SearchBox = ({ onSearch }: Props) => {
  const searchBoxRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (searchBoxRef.current?.value) {
      onSearch(searchBoxRef.current.value);
    }
  };

  return (
    <form className="" onSubmit={(event: any) => handleSubmit(event)}>
      <input
        type="text"
        ref={searchBoxRef}
        name=""
        className="rounded-xl text-lg text-black w-[200px] lg:w-[400px] h-10 px-4 outline-none focus:bg-gray-200 font-ptsans"
        id=""
        placeholder="Search by Name"
      />
    </form>
  );
};

export default SearchBox;

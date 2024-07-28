interface Props {
  name: string;
  title: string;
  handleChange: (event: string) => void;
}

export default function handleImage({ name, title, handleChange }: Props) {
  return (
    <div className="flex items-center mt-2 ">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center  text-white     bg-black font-ptsans font-bold  rounded-md cursor-pointer "
      >
        <div className="flex flex-col items-center justify-center px-6 py-2 ">
          <p className="text-sm font-ptsans  text-white">{title}</p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={(e: any) => handleChange(e)}
          name={name}
          accept="image/*"
        />
      </label>
    </div>
  );
}

interface Props {
  colors: string[];
  min_price: number;
}

const VariationCard = ({ colors, min_price }: Props) => {
  return (
    <>
      <div className="z-50 w-full flex items-center justify-center px-4  gap-8 ">
        {colors.map((color) => (
          <span
            className="size-6 rounded-md"
            style={{ backgroundColor: `${color}` }}
          ></span>
        ))}
      </div>
      <div>
        <span>{min_price}</span>
      </div>
    </>
  );
};

export default VariationCard;

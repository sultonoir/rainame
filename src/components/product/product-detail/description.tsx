import parse from "html-react-parser";

type Props = {
  desc: string;
};

const ProductDescription = ({ desc }: Props) => {
  return (
    <div className="space-y-6">
      <p className="font-bold text-xl">Product Description</p>
      <div>{parse(desc)}</div>
    </div>
  );
};

export default ProductDescription;

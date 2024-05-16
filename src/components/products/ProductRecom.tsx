import Wrapper from "../ui/wrapper";
import Products from "./Products";

const ProductRecom = () => {
  return (
    <Wrapper className="min-h-[360px]">
      <p className="text-2xl">Recomendations</p>
      <Products />
    </Wrapper>
  );
};

export default ProductRecom;

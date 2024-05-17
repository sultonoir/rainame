import Recomendation from "../filter/Recomendation";
import Wrapper from "../ui/wrapper";

const ProductRecom = () => {
  return (
    <Wrapper className="min-h-[360px] space-y-5">
      <p className="text-2xl font-semibold">Recomendations</p>
      <Recomendation />
    </Wrapper>
  );
};

export default ProductRecom;

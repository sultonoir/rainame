interface Props {
  discount: number;
  price: number;
}

export const calculate = ({ discount, price }: Props) => {
  let total = price;
  if (discount > 0) {
    const discountAmount = (price * discount) / 100;
    total = price - discountAmount;
  }
  total = parseFloat(total.toFixed(2));
  return total;
};


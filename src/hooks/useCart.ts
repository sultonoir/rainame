import { create } from "zustand";
export type Cart = {
  productId: string;
  name: string;
  image: string[];
  totalPrice: number;
  totalProduct: number;
  size?: string;
  color?: string;
  cartId: string;
};

type Tsize = {
  cartId: string;
  size: string;
};

type Tcolor = {
  cartId: string;
  color: string;
};

interface CartState {
  selected: Cart[];
  onSelectedAll: (value: Cart[]) => void;
  onSelect: (value: Cart) => void;
  increment: (value: Cart) => void;
  decrement: (value: Cart) => void;
  onChangeSize: (value: Tsize) => void;
  onChangeColor: (value: Tcolor) => void;
}

const useCart = create<CartState>((set) => ({
  selected: [],
  onSelectedAll: (value: Cart[]) => {
    set((state) => ({
      selected: state.selected.length === value.length ? [] : value,
    }));
  },
  onSelect: (value: Cart) => {
    set((state) => {
      const isSelected = state.selected.find(
        (item) => item.cartId === value.cartId,
      );
      let updatedSelection = [];
      if (isSelected) {
        updatedSelection = state.selected.filter(
          (item) => item.cartId !== value.cartId,
        ); // Deselect the item
      } else {
        updatedSelection = [...state.selected, value]; // Select the item
      }
      return { selected: updatedSelection };
    });
  },
  increment: (value) => {
    set((state) => {
      const newData = state.selected.map((item) =>
        item.cartId === value.cartId
          ? {
              ...item,
              totalProduct: item.totalProduct + 1,
              totalPrice: value.totalPrice * (item.totalProduct + 1),
            }
          : item,
      );

      const productExists = newData.some(
        (item) => item.cartId === value.cartId,
      );

      if (!productExists) {
        newData.push(value);
      }

      return { selected: newData };
    });
  },
  decrement: (value) => {
    set((state) => {
      const newData = state.selected.map((item) =>
        item.cartId === value.cartId
          ? {
              ...item,
              totalProduct: item.totalProduct - 1,
              totalPrice: value.totalPrice * (item.totalProduct - 1),
            }
          : item,
      );
      return { selected: newData };
    });
  },
  onChangeSize: (value) => {
    set((state) => {
      const newData = state.selected.map((item) =>
        item.cartId === value.cartId
          ? {
              ...item,
              size: value.size,
            }
          : item,
      );
      return { selected: newData };
    });
  },
  onChangeColor: (value) => {
    set((state) => {
      const newData = state.selected.map((item) =>
        item.cartId === value.cartId
          ? {
              ...item,
              color: value.color,
            }
          : item,
      );
      return { selected: newData };
    });
  },
}));

export default useCart;

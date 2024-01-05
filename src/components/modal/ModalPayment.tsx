"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { BanknoteIcon, MinusIcon, PlusIcon } from "lucide-react";
import { type Products } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import useModal from "@/hooks/useModal";

type Props = {
  product: Products;
};

const ModalPayment = ({ product }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [count, setCount] = useState(1);
  const [selectColor, setSelectColor] = useState(product.color.at(0) ?? "");
  const [selectSize, setSelectSize] = useState(product.size.at(0));
  const stock = product?.stock;
  const increment = () => {
    if (stock && count - stock) {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const totalPrice = () => {
    const price = product.price;
    const amount = count;
    const discount = product.discount;
    let total = price * amount;
    let discountedPrice = total;
    if (discount && discount > 0) {
      const discountAmount = (total * discount) / 100;
      discountedPrice = total - discountAmount;
    }
    total = parseFloat(total.toFixed(2));
    discountedPrice = parseFloat(discountedPrice.toFixed(2));
    return {
      total,
      discountedPrice,
    };
  };

  //* mutate addchart
  const router = useRouter();
  const path = usePathname();
  const result = totalPrice();
  const { mutate, isLoading } = api.cart.productPayment.useMutation({
    onSuccess: (e) => {
      router.push(e!);
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
  const discount = result.discountedPrice;
  const price = result.total;

  const { data } = useSession();
  const toggle = useModal();

  //handle add payment
  const handlePayment = () => {
    if (!data) {
      return toggle.onOpen();
    }
    if (!selectColor || !selectSize) {
      return toast.error("Color & size not selected yet");
    }
    mutate({
      productId: product.id,
      path,
      name: product.name,
      color: selectColor,
      size: selectSize,
      totalPrice: product.discount ? discount : price,
      totalProduct: count,
      imageUrl: product.imageUrl,
    });
  };

  return (
    <>
      <Button
        variant="solid"
        color="primary"
        className="w-full"
        onPress={onOpen}
      >
        <BanknoteIcon size={14} />
        <p>Pay now</p>
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {product.name}
              </ModalHeader>
              <ModalBody>
                <Input
                  startContent={
                    <Button
                      onClick={decrement}
                      className="bg-transparent"
                      isIconOnly
                    >
                      <MinusIcon />
                    </Button>
                  }
                  type="number"
                  size="md"
                  labelPlacement="outside"
                  maxLength={100}
                  max={100}
                  value={count.toString()}
                  classNames={{
                    inputWrapper: "px-0",
                  }}
                  onValueChange={(value) => {
                    if (value && !isNaN(Number(value))) {
                      // Pastikan value adalah angka
                      const numericValue = Number(value);
                      if (numericValue < 1) {
                        setCount(1); // Setel nilainya menjadi 1 jika kurang dari 1
                      } else if (numericValue <= stock) {
                        setCount(numericValue);
                      } else {
                        setCount(stock); // Jika melebihi stock, tetapkan ke stock
                      }
                    }
                  }}
                  endContent={
                    <Button
                      onClick={increment}
                      className="bg-transparent"
                      isIconOnly
                    >
                      <PlusIcon />
                    </Button>
                  }
                />
                <div className="flex flex-col gap-y-3 border-b border-default-100 py-5">
                  <h2>
                    <span className="font-semibold text-default-400">
                      Choice color :
                    </span>{" "}
                    {product.color.length}
                  </h2>
                  <div className="flex w-full flex-row flex-wrap gap-2">
                    {product?.color.map((e) => (
                      <Button
                        key={e}
                        variant="bordered"
                        className={`${
                          e === selectColor &&
                          "border border-primary bg-primary text-white"
                        } hover:border hover:border-primary hover:bg-primary hover:text-white dark:text-white `}
                        onPress={() => setSelectColor(e)}
                      >
                        {e}
                      </Button>
                    ))}
                  </div>
                  {product.size.length > 0 && (
                    <>
                      <h2>Choice Size</h2>
                      <div className="flex w-full flex-row flex-wrap gap-2">
                        {product.size.map((e) => (
                          <Button
                            key={e}
                            variant="bordered"
                            className={`${
                              e === selectSize &&
                              "border border-primary bg-primary text-white"
                            } hover:border hover:border-primary hover:bg-primary hover:text-white dark:text-white `}
                            onPress={() => setSelectSize(e)}
                          >
                            {e}
                          </Button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
                <div className="flex w-full items-center justify-between">
                  <p>Stock</p>
                  <p>{product.stock}</p>
                </div>
                {product.discount && product.discount > 0 ? (
                  <div className="flex w-full justify-between text-start text-medium font-semibold">
                    <p>Total</p>
                    <div className="flex gap-2">
                      <p className="text-foreground-200 line-through">
                        ${price}
                      </p>
                      <p className="w-full text-start text-medium font-semibold">
                        ${discount}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex w-full justify-between text-start text-medium font-semibold">
                    <p>Total</p>
                    <span>${price}</span>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  isLoading={isLoading}
                  variant="solid"
                  color="primary"
                  className="w-full"
                  onClick={handlePayment}
                >
                  <BanknoteIcon size={14} />
                  <p>Pay now</p>
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalPayment;

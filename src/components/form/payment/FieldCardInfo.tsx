"use client";
import { Button } from "@/components/ui/button";
import { Check, CreditCard } from "lucide-react";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import { navigate } from "@/lib/navigate";
import { toast } from "sonner";

interface Props {
  id: string;
}

const FieldCardInfo = ({ id }: Props) => {
  const [cardNumber, setCardNumber] = useState("1234 4444 4444 4444");
  const [cvv, setCvv] = useState("");
  const [expaired, setExpaired] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState({
    field: "",
    message: "",
    isError: false,
  });
  const formatCardNumber = (input: string) => {
    // Hapus semua karakter yang bukan angka
    const cleaned = input.replace(/\D/g, "").slice(0, 16);
    // Format nomor telepon
    const formatted = cleaned.replace(
      /^(\d{4})(\d{0,4})(\d{0,4})(\d{0,4})$/,
      (_, p1, p2, p3, p4) => {
        let result = p1 as string;
        if (p2) result += " " + p2;
        if (p3) result += " " + p3;
        if (p4) result += " " + p4;
        return result;
      },
    );
    return formatted;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const formattedInput = formatCardNumber(input);
    setCardNumber(formattedInput);
  };

  const formatDate = (input: string) => {
    const cleaned = input.replace(/\D/g, "").slice(0, 4);
    const formatted = cleaned.replace(/^(\d{2})(\d{0,2})$/, (_, p1, p2) => {
      let result = p1 as string;
      if (p2) result += "/" + p2;
      return result;
    });
    return formatted;
  };

  const validaton = (input: string) => {
    const getlastInput = input.slice(3, 5);
    const getYear = new Date().getFullYear().toString();
    const getLastYear = getYear.slice(2, 4);
    const result = parseInt(getlastInput) < parseInt(getLastYear);
    setError({
      field: "cvv",
      isError: result,
      message: "Your card's expiration year is in the past.",
    });
  };

  const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const formattedInput = formatDate(input);
    validaton(input);
    setExpaired(formattedInput);
  };

  const handleCvv = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (input.length > 3) {
      return;
    }
    setCvv(input);
  };

  const ctx = api.useUtils();
  const { mutate, isPending } = api.payment.paidPayment.useMutation({
    onSuccess: async () => {
      await ctx.cart.getIndicator.invalidate();
      await ctx.notifi.notifyIndicator.invalidate();
      navigate("/");
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const handleSubmit = () => {
    if (name === "") {
      setError({
        field: "name",
        isError: true,
        message: "Name has not been entered",
      });
      return;
    }
    mutate({ id });
  };

  return (
    <div className="scroll-mt-24">
      <div className="z-0 overflow-hidden rounded-xl border">
        <div className="flex flex-col items-start p-6 sm:flex-row ">
          <CreditCard size={20} className="mt-1 text-muted-foreground" />
          <div className="sm:ml-8">
            <h3 className=" flex items-center text-muted-foreground">
              <span className="uppercase tracking-tight">Contact info</span>
              <Check size={18} className="ml-2" />
            </h3>
            <div className="mt-1 inline-flex text-sm font-semibold">
              <span className="tracking-tighter">{cardNumber}</span>
            </div>
          </div>
        </div>
        <div className="space-y-4 border-t px-6 py-7 sm:space-y-6">
          <div className="space-y-2">
            <Label htmlFor="card">Card information</Label>
            <div className="flex flex-col">
              <Input
                id="card"
                type="text"
                value={cardNumber}
                onChange={handleChange}
                className="rounded-b-none"
                placeholder="xxxx-xxxx-xxxx"
              />
              <div className="flex">
                {error.isError && error.field === "nocard" && (
                  <p className="mt-1 text-sm text-red-600">{error.message}</p>
                )}
                <Input
                  id="card"
                  type="text"
                  value={expaired}
                  onChange={handleDate}
                  className="rounded-none rounded-bl-md"
                  placeholder="MM/YY"
                />
                <Input
                  id="card"
                  type="text"
                  value={cvv}
                  onChange={handleCvv}
                  className="rounded-none rounded-br-md"
                  placeholder="CCV"
                />
              </div>
              {error.isError && error.field === "cvv" && (
                <p className="mt-1 text-sm text-red-600">{error.message}</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Cardholder name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
            />
            {error.isError && error.field === "name" && (
              <p className="mt-1 text-sm text-red-600">{error.message}</p>
            )}
          </div>
          <div className="flex w-full gap-2">
            <Button
              className="w-full rounded-lg"
              disabled={isPending}
              isLoading={isPending}
              onClick={handleSubmit}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FieldCardInfo;

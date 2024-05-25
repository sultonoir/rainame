"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, UserCircle2 } from "lucide-react";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";

const FieldContact = () => {
  const { data } = useSession();
  const [open, setOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("895-3545-5768");
  const formatPhoneNumber = (input: string) => {
    // Hapus semua karakter yang bukan angka
    const cleaned = input.replace(/\D/g, "").slice(0, 12);
    // Format nomor telepon
    const formatted = cleaned.replace(
      /^(\d{3})(\d{0,4})(\d{0,5})$/,
      (_, p1, p2, p3) => {
        let result = p1 as string;
        if (p2) result += "-" + p2;
        if (p3) result += "-" + p3;
        return result;
      },
    );
    return formatted;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const formattedInput = formatPhoneNumber(input);
    setPhoneNumber(formattedInput);
  };

  return (
    <div className="scroll-mt-24">
      <div className="z-0 overflow-hidden rounded-xl border">
        <div className="flex flex-col items-start p-6 sm:flex-row ">
          <UserCircle2 size={20} className="mt-1 text-muted-foreground" />
          <div className="sm:ml-8">
            <h3 className=" flex items-center text-muted-foreground">
              <span className="uppercase tracking-tight">Contact info</span>
              <Check size={18} className="ml-2" />
            </h3>
            <div className="mt-1 inline-flex text-sm font-semibold">
              <p>{data?.user.email}</p>
              <span className="ml-3 tracking-tighter">+62-{phoneNumber}</span>
            </div>
          </div>
          <Button
            variant="secondary"
            onClick={() => setOpen(!open)}
            className="ml-auto h-fit rounded-lg"
          >
            Change
          </Button>
        </div>
        <div
          className={cn("hidden space-y-4 border-t px-6 py-7 sm:space-y-6", {
            block: open === true,
          })}
        >
          <div className="space-y-2">
            <Label htmlFor="phone-number">Your phone number</Label>
            <div className="flex w-full items-center rounded-md border focus-within:border-primary/50 focus-within:ring focus-within:ring-primary/30">
              <span className="pl-2 text-muted-foreground">+62</span>
              <Input
                id="phone-number"
                type="text"
                value={phoneNumber}
                onChange={handleChange}
                placeholder="xxxx-xxxx-xxxx"
                className="peer/search border-none outline-none ring-0 focus:ring-0"
              />
            </div>
          </div>
          <div className="flex w-full gap-2">
            <Button
              className="w-full rounded-lg"
              onClick={() => setOpen(!open)}
            >
              Save
            </Button>
            <Button variant="outline" onClick={() => setOpen(!open)}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FieldContact;

"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Truck } from "lucide-react";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const FieldAddress = () => {
  const [open, setOpen] = useState(false);
  const [address, setaddress] = useState("St. Paul's Road");
  const [apt, setApt] = useState("55U - DD5");
  const [city, setCity] = useState("Norris");
  const [country, setCountry] = useState("Japan");
  const [zip, setZip] = useState("2500");

  return (
    <div className="scroll-mt-24">
      <div className="z-0 overflow-hidden rounded-xl border">
        <div className="flex flex-col items-start p-6 sm:flex-row ">
          <Truck size={20} className="mt-1 text-muted-foreground" />
          <div className="sm:ml-8">
            <h3 className=" flex items-center text-muted-foreground">
              <span className="uppercase tracking-tight">SHIPPING ADDRESS</span>
              <Check size={18} className="ml-2" />
            </h3>
            <div className="mt-1 inline-flex text-sm font-semibold">
              <span className="tracking-tighter">
                {address}, {apt}, {city}, {zip}, {country}
              </span>
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
            <Label htmlFor="phone-number">Fullname</Label>
            <Input id="phone-number" type="text" placeholder="jhon" />
          </div>
          <div className="flex w-full flex-col lg:flex-row lg:gap-4">
            <div className="w-[60%] space-y-2">
              <Label htmlFor="Address">Address</Label>
              <Input
                id="Address"
                type="text"
                value={address}
                onChange={(e) => setaddress(e.target.value)}
                placeholder="jhon"
                className="w-full"
              />
            </div>
            <div className="w-[40%] space-y-2">
              <Label htmlFor="apt">Apt, Suite *</Label>
              <Input
                id="apt"
                type="text"
                placeholder="jhon"
                value={apt}
                onChange={(e) => setApt(e.target.value)}
              />
            </div>
          </div>
          <div className="flex w-full flex-col lg:flex-row lg:gap-4">
            <div className="w-full space-y-2">
              <Label htmlFor="City">City</Label>
              <Input
                id="City"
                type="text"
                placeholder="jhon"
                className="w-full"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="w-full space-y-2">
              <Label htmlFor="Country">Country</Label>
              <Input
                id="Country"
                type="text"
                placeholder="jhon"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
          </div>
          <div className="flex w-full flex-col lg:flex-row lg:gap-4">
            <div className="w-full space-y-2">
              <Label htmlFor="state">State/Province</Label>
              <Input
                id="state"
                type="text"
                placeholder="jhon"
                className="w-full"
              />
            </div>
            <div className="w-full space-y-2">
              <Label htmlFor="portal">Postal code</Label>
              <Input
                id="portal"
                type="text"
                placeholder="jhon"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
              />
            </div>
          </div>
          <div className="flex w-full flex-col space-y-2">
            <p className="">Address type</p>
            <RadioGroup defaultValue="comfortable" className="flex flex-row">
              <div className="flex w-full items-center space-x-2">
                <RadioGroupItem value="default" id="r1" />
                <Label htmlFor="r1">Home (All Day Delivery)</Label>
              </div>
              <div className="flex w-full items-center space-x-2">
                <RadioGroupItem value="compact" id="r3" />
                <Label htmlFor="r3">Office (Delivery 9 AM - 5 PM)</Label>
              </div>
            </RadioGroup>
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

export default FieldAddress;

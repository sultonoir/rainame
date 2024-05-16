import { BadgeDollarSign, Globe, Repeat2, Truck } from "lucide-react";
import React from "react";

const Feature = () => {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <div className="flex flex-col rounded-2xl bg-red-50 p-5">
        <div className="text-black">
          <Truck />
        </div>
        <div className="mt-2.5">
          <p className="font-semibold text-slate-900">Free shipping</p>
          <p className="mt-0.5 text-sm text-slate-500">On orders over $50.00</p>
        </div>
      </div>
      <div className="flex flex-col rounded-2xl bg-sky-50 p-5">
        <div className="text-black">
          <Repeat2 />
        </div>
        <div className="mt-2.5">
          <p className="font-semibold text-slate-900">Very easy to return</p>
          <p className="mt-0.5 text-sm text-slate-500">Just phone number.</p>
        </div>
      </div>
      <div className="flex flex-col rounded-2xl bg-green-50 p-5">
        <div className="text-black">
          <Globe />
        </div>
        <div className="mt-2.5">
          <p className="font-semibold text-slate-900">Nationwide Delivery</p>
          <p className="mt-0.5 text-sm text-slate-500">
            Fast delivery nationwide.
          </p>
        </div>
      </div>
      <div className="flex flex-col rounded-2xl bg-amber-50 p-5">
        <div className="text-black">
          <BadgeDollarSign />
        </div>
        <div className="mt-2.5">
          <p className="font-semibold text-slate-900">Refunds policy</p>
          <p className="mt-0.5 text-sm text-slate-500">
            60 days return for any reason
          </p>
        </div>
      </div>
    </div>
  );
};

export default Feature;

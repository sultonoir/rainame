import { type LucideProps } from "lucide-react";

export type Option = Record<"value" | "label", string> & Record<string, string>;

export type AdminMenuList = {
  title: string;
  path: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  count: number
};

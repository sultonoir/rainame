"use client";
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Option } from "@/types";
import { CreateCategoryButton } from "../templates/button/create-category-button";

type AutoCompleteProps = {
  options: Option[];
  id?: string;
  value: Option;
  onValueChange: (value: Option) => void;
  placeholder?: string;
};

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

const dropdownVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  closed: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

export const AutoComplete = ({
  options,
  placeholder,
  value,
  onValueChange,
  id,
}: AutoCompleteProps) => {
  const [inputValue, setInputValue] = useState("");
  const [active, setActive] = useState(false);
  const [selected, setSelected] = useState<Option>(value);

  const hasSearchFilter = Boolean(inputValue);

  const onSelect = (option: Option) => {
    setSelected(option);
    setActive(false);
    onValueChange(option);
    setInputValue(option.label);
  };

  const result = useMemo(() => {
    let newOptions = [...options];
    if (hasSearchFilter) {
      newOptions = newOptions.filter((item) =>
        item.label.toLowerCase().includes(inputValue.toLowerCase()),
      );
    }
    return newOptions;
  }, [hasSearchFilter, inputValue, options]);

  return (
    <Menu setActive={setActive}>
      <MenuItem
        setInputValue={setInputValue}
        setActive={setActive}
        active={active}
        inputValue={inputValue}
        placeholder={placeholder}
      >
        {result.length > 0 ? (
          <div className="flex w-full flex-col p-2">
            {result.map((framework) => (
              <div
                key={framework.label}
                className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                onClick={() => onSelect(framework)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selected.label === framework.label
                      ? "opacity-100"
                      : "opacity-0",
                  )}
                />
                {framework.label}
              </div>
            ))}
          </div>
        ) : (
          <CreateCategoryButton
            inputvalue={inputValue}
            id={id}
            onValueSelect={onSelect}
          />
        )}
      </MenuItem>
    </Menu>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: boolean) => void;
  children: React.ReactNode;
}) => {
  return (
    <div
      onMouseLeave={() => setActive(false)} // resets the state
      className="relative flex w-full space-x-4 rounded-full border border-transparent shadow-input"
    >
      {children}
    </div>
  );
};

export const MenuItem = ({
  setActive,
  active,
  inputValue,
  children,
  setInputValue,
  placeholder,
}: {
  setActive: (item: boolean) => void;
  active: boolean;
  inputValue: string;
  placeholder?: string;
  setInputValue: (value: string) => void;
  children?: React.ReactNode;
}) => {
  return (
    <div onMouseEnter={() => setActive(true)} className="relative w-full">
      <div className="flex w-full items-center rounded-lg border px-3">
        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        <input
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          placeholder={placeholder}
          className={cn(
            "flex h-11 w-full rounded-lg bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          )}
        />
      </div>
      {active && (
        <motion.div
          variants={dropdownVariants}
          initial="closed"
          animate={active ? "open" : "closed"}
          transition={transition}
        >
          <div className="absolute left-1/2 top-[calc(100%_+_0rem)] w-full -translate-x-1/2 transform">
            <motion.div
              layoutId="active" // layoutId ensures smooth animation
              className="overflow-hidden rounded-lg border bg-popover shadow-xl backdrop-blur-sm"
            >
              <motion.div layout className="size-full">
                {children}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Option } from "@/types";
import { CreateCategoryButton } from "../templates/button/button-create-category";

type AutoCompleteProps = {
  options: Option[];
  id?: string;
  value: Option;
  onValueChange: (value: Option) => void;
  placeholder?: string;
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
      <AnimatePresence>
        <MenuItem
          setInputValue={setInputValue}
          setActive={setActive}
          active={active}
          inputValue={inputValue}
          placeholder={placeholder}
        >
          <div className="overflow-hidden rounded-lg border bg-popover shadow-xl backdrop-blur-sm">
            {result.length > 0 ? (
              <motion.div className="flex w-full flex-col p-2">
                {result.map((framework, index) => (
                  <motion.div
                    key={framework.label}
                    className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent"
                    onClick={() => onSelect(framework)}
                    layoutId={framework.label}
                    initial={{ opacity: 0, filter: "blur(4px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(4px)" }}
                    transition={{
                      duration: 0.2,
                      delay: index * 0.05, // delay bertingkat untuk tiap item
                    }}
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
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(10px)" }}
                transition={{
                  duration: 0.2,
                }}
              >
                <CreateCategoryButton
                  inputvalue={inputValue}
                  id={id}
                  onValueSelect={onSelect}
                />
              </motion.div>
            )}
          </div>
        </MenuItem>
      </AnimatePresence>
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
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleOnClick(event: MouseEvent) {
      if (ref.current && !event.composedPath().includes(ref.current)) {
        setActive(false);
      }
    }
    document.body.addEventListener("click", handleOnClick);
    return () => {
      document.body.removeEventListener("click", handleOnClick);
    };
  }, [setActive]);

  return (
    <div
      ref={ref}
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
    <div className="relative w-full">
      <div
        onClick={() => setActive(true)}
        className="flex w-full items-center rounded-lg border px-3"
      >
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
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: "-50%" }} // translateX(-50%) dan translateY(20px)
            animate={{ opacity: 1, y: 0, x: "-50%" }} // tetap translateX(-50%) dan translateY(0px)
            exit={{ opacity: 0, y: 20, x: "-50%" }} // tetap translateX(-50%) dan translateY(20px)
            transition={{
              duration: 0.5, // durasi transisi
              ease: "easeInOut", // jenis transisi
            }}
            className="absolute left-1/2 top-[calc(100%_+_0rem)] z-[60] w-full transform"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

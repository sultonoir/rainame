"use client";

import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { type Option } from "@/types";
import { CreateCategoryButton } from "../templates/button/create-category-button";

type AutoCompleteProps = {
  options: Option[];
  id?: string;
  value: Option;
  onValueChange: (value: Option) => void;
  placeholder?: string;
};

export function AutoComplete({
  options,
  id,
  value,
  onValueChange,
  placeholder,
}: AutoCompleteProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(value);
  const [inputValue, setInputValue] = React.useState(value.label ?? "");

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (!input) {
        return;
      }

      // Keep the options displayed when the user is typing
      if (!open) {
        setOpen(true);
      }

      // This is not a default behaviour of the <input /> field
      if (event.key === "Enter" && input.value !== "") {
        const optionToSelect = options.find(
          (option) => option.label === input.value,
        );
        if (optionToSelect) {
          setSelected(optionToSelect);
          onValueChange(optionToSelect);
        }
      }

      if (event.key === "Escape") {
        input.blur();
      }
    },
    [open, options, onValueChange],
  );

  const handleSelectOption = React.useCallback(
    (selectedOption: Option) => {
      setInputValue(selectedOption.label);

      setSelected(selectedOption);
      onValueChange(selectedOption);
      setOpen(false);

      // This is a hack to prevent the input from being focused after the user selects an option
      // We can call this hack: "The next tick"
      setTimeout(() => {
        inputRef?.current?.blur();
      }, 0);
    },
    [onValueChange],
  );

  return (
    <Command
      onMouseLeave={() => setOpen(false)}
      onKeyDown={handleKeyDown}
      className="bg-transparent"
    >
      <CommandInput
        ref={inputRef}
        placeholder={placeholder}
        value={inputValue}
        onValueChange={setInputValue}
        onMouseEnter={() => setOpen(true)}
      />
      <CommandList
        className={cn("", {
          hidden: open === false,
        })}
      >
        <CommandEmpty asChild>
          <CreateCategoryButton
            onValueSelect={handleSelectOption}
            id={id}
            inputvalue={inputValue}
          />
        </CommandEmpty>
        <CommandGroup>
          {options.map((option) => (
            <CommandItem
              key={option.value}
              value={option.label}
              onSelect={() => handleSelectOption(option)}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  selected.label === option.label ? "opacity-100" : "opacity-0",
                )}
              />
              {option.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

import { Check, ChevronDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { githubLanguages } from "@/lib/github";

interface Props {
  value: string;
  onSelect: (newValue: string) => void;
}

export function LanguageFilter({ value, onSelect }: Props) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
          {value || "Language"}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search languages..." />
          <CommandEmpty>No language found.</CommandEmpty>
          <CommandGroup className="max-h-[200px] overflow-y-auto">
            {Object.keys(githubLanguages).map(lang => (
              <CommandItem
                key={lang}
                onSelect={currentValue => {
                  onSelect(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                {value === lang.toLowerCase() ? (
                  <Check className={"mr-2 h-4 w-4"} />
                ) : (
                  <div className="mr-2 h-4 w-4 flex justify-center items-center">
                    <div
                      className="rounded-full h-[6px] w-[6px] bg-gray-400"
                      style={{ backgroundColor: githubLanguages[lang]?.color }}
                    />
                  </div>
                )}

                {lang}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

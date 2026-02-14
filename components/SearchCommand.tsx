"use client";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Loader2, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { INITIAL_COINS } from "@/lib/constants";

interface SearchCommandProps {
  initialCoins: StockAsset[];
}

const SearchCommand = ({
  initialCoins = INITIAL_COINS,
}: SearchCommandProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-4 ">
        <Button
          onClick={() => setOpen(true)}
          variant="outline"
          className="px-4 py-2 md:text-base"
        >
          <TrendingUp className="h-4 w-4" />
          Search
        </Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <Command>
            <CommandInput placeholder="Search coins by name or symbol..." />
            <CommandList>
              <CommandEmpty>No coins found.</CommandEmpty>
              <CommandGroup heading="Coins">
                {initialCoins.map((coin) => (
                  <CommandItem
                    key={coin.symbol}
                    onSelect={() => {
                      setOpen(false);
                      // Navigate to coin page
                      window.location.href = `/market/${coin.symbol}`;
                    }}
                  >
                    <TrendingUp className="mr-2 h-4 w-4" />
                    {coin.name} ({coin.symbol.toUpperCase()})
                    <CommandShortcut>Enter</CommandShortcut>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </CommandDialog>
      </div>
    </>
  );
};

export default SearchCommand;

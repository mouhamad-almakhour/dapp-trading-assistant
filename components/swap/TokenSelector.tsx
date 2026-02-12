"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface TokenSelectorProps {
  /** Currently selected token */
  selectedToken: Token | null;
  /** List of available tokens */
  tokens: Token[];
  /** Callback when token is selected */
  onSelect: (token: Token) => void;
  /** Optional token to disable (e.g., already selected as other side) */
  disabledToken?: Token | null;
}

/**
 * Token selector modal component
 * Shows a searchable list of tokens to choose from
 */
export function TokenSelector({
  selectedToken,
  tokens,
  onSelect,
  disabledToken,
}: TokenSelectorProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter tokens based on search
  const filteredTokens = tokens.filter((token) => {
    const query = searchQuery.toLowerCase();
    return (
      token.symbol.toLowerCase().includes(query) ||
      token.name.toLowerCase().includes(query) ||
      token.address.toLowerCase().includes(query)
    );
  });

  const handleSelect = (token: Token) => {
    onSelect(token);
    setOpen(false);
    setSearchQuery("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "gap-2 font-semibold",
            !selectedToken && "text-muted-foreground",
          )}
        >
          {selectedToken ? (
            <>
              {selectedToken.logoUrl && (
                <Image
                  src={selectedToken.logoUrl}
                  alt={selectedToken.symbol}
                  width={20}
                  height={20}
                  className="rounded-full"
                />
              )}
              <span>{selectedToken.symbol}</span>
            </>
          ) : (
            <span>Select token</span>
          )}
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Select a token</DialogTitle>
        </DialogHeader>

        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, symbol, or address"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Token list */}
        <div className="max-h-[400px] overflow-y-auto">
          {filteredTokens.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground py-8">
              No tokens found
            </p>
          ) : (
            <div className="space-y-1">
              {filteredTokens.map((token) => {
                const isSelected = selectedToken?.address === token.address;
                const isDisabled = disabledToken?.address === token.address;

                return (
                  <button
                    key={token.address}
                    onClick={() => !isDisabled && handleSelect(token)}
                    disabled={isDisabled}
                    className={cn(
                      "w-full flex items-center gap-3 p-3 rounded-lg transition-colors",
                      "hover:bg-muted",
                      isSelected && "bg-muted",
                      isDisabled && "opacity-40 cursor-not-allowed",
                    )}
                  >
                    {/* Token logo */}
                    {token.logoUrl ? (
                      <Image
                        src={token.logoUrl}
                        alt={token.symbol}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        <span className="text-xs font-bold">
                          {token.symbol.slice(0, 2)}
                        </span>
                      </div>
                    )}

                    {/* Token info */}
                    <div className="flex-1 text-left">
                      <div className="font-semibold">{token.symbol}</div>
                      <div className="text-xs text-muted-foreground">
                        {token.name}
                      </div>
                    </div>

                    {/* Check icon if selected */}
                    {isSelected && <Check className="h-5 w-5 text-primary" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

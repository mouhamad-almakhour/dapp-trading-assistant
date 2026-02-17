"use client";

import { useEffect, useState, useCallback, useTransition } from "react";
import { useRouter } from "next/navigation";
import { TrendingUp, Search, Loader2, AlertCircle } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { useDebounce } from "@/hooks/useDebouncedValue";
import { fetchCoinsList } from "@/lib/actions/coingecko.actions";
import { Button } from "./ui/button";
import { INITIAL_COINS } from "@/lib/constants";

// ─────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────

const INITIAL_DISPLAY_LIMIT = 20;
const SEARCH_RESULT_LIMIT = 30;
const DEBOUNCE_DELAY = 300; // ms

const SearchCommand = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Coin[]>(
    INITIAL_COINS.slice(0, INITIAL_DISPLAY_LIMIT),
  );
  const [coins, setCoins] = useState<Coin[]>(INITIAL_COINS);
  const [isFullListLoaded, setIsFullListLoaded] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // ── Filter logic ────────────────────────────
  const runFilter = useCallback(
    (value: string, list: Coin[]) => {
      const trimmed = value.trim().toLowerCase();
      const limit = isFullListLoaded
        ? SEARCH_RESULT_LIMIT
        : INITIAL_DISPLAY_LIMIT;

      if (!trimmed) {
        setResults(list.slice(0, limit));
        setIsSearching(false);
        return;
      }

      const filtered = list
        .filter(
          (coin) =>
            coin.name.toLowerCase().includes(trimmed) ||
            coin.symbol.toLowerCase().includes(trimmed) ||
            coin.id.toLowerCase().includes(trimmed),
        )
        .slice(0, limit);

      setResults(filtered);
      setIsSearching(false);
    },
    [isFullListLoaded],
  );
  // ── Debounced version of runFilter ──────────
  const debouncedFilter = useDebounce(
    () => runFilter(query, coins),
    DEBOUNCE_DELAY,
  );

  // ── Handle input change ─────────────────────
  const handleQueryChange = useCallback(
    (value: string) => {
      setQuery(value);
      setIsSearching(true); // show spinner immediately while debounce waits
      debouncedFilter();
    },
    [debouncedFilter],
  );

  // ── Keyboard shortcut: Ctrl+K / Cmd+K ──────
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // ── Fetch full list on first open ───────────
  useEffect(() => {
    if (!open || isFullListLoaded) return;

    startTransition(async () => {
      try {
        const coins = await fetchCoinsList();
        setCoins(coins);
        setIsFullListLoaded(true);
        runFilter(query, coins);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to fetch coins",
        );
      }
    });
  }, [open, isFullListLoaded]);

  // ── Handle dialog open/close ─────────────────
  const handleOpenChange = useCallback(
    (value: boolean) => {
      setOpen(value);
      if (!value) {
        setQuery("");
        setResults(coins.slice(0, INITIAL_DISPLAY_LIMIT));
        setIsSearching(false);
      }
    },
    [coins],
  );
  // ── Navigate ─────────────────────────────────
  const handleSelect = useCallback(
    (coin: Coin) => {
      setOpen(false);
      router.push(`/market/${coin.symbol}`);
    },
    [router],
  );

  const showTopCoins = !query.trim();
  return (
    <>
      <div className="flex flex-col gap-4 ">
        <Button
          onClick={() => setOpen(true)}
          variant="outline"
          className="px-4 py-2 md:text-base"
          aria-label="Search coins (Ctrl+K)"
        >
          <Search className="h-3.5 w-3.5 shrink-0" />
          <span className="flex-1 text-left">Search coins...</span>
          <kbd
            className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5
            text-[10px] font-medium bg-background border border-border
            rounded text-muted-foreground"
          >
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>

        {/* Command dialog */}
        <CommandDialog open={open} onOpenChange={handleOpenChange}>
          <CommandInput
            placeholder="Search by name, symbol or ID..."
            value={query}
            onValueChange={handleQueryChange}
          />
          <CommandList>
            {/* Fetching from API */}
            {isPending && (
              <div className="flex items-center justify-center gap-2 py-6 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading full coin list...
              </div>
            )}

            {/* Debounce in progress */}
            {!isPending && isSearching && (
              <div className="flex items-center justify-center gap-2 py-6 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Searching...
              </div>
            )}

            {/* Error */}
            {error && !isPending && (
              <div className="flex items-center gap-2 px-4 py-3 text-sm text-destructive">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}. Showing fallback list.
              </div>
            )}

            {/* No results */}
            {!isPending && !isSearching && results.length === 0 && (
              <CommandEmpty>
                No coins found for &quot;{query}&quot;.
              </CommandEmpty>
            )}

            {/* Results */}
            {!isPending && !isSearching && results.length > 0 && (
              <CommandGroup
                heading={
                  showTopCoins
                    ? isFullListLoaded
                      ? "Top Coins"
                      : "Popular Coins"
                    : `Results for "${query}"`
                }
              >
                {results.map((coin) => (
                  <CommandItem
                    key={coin.id}
                    value={`${coin.name} ${coin.symbol} ${coin.id}`}
                    onSelect={() => handleSelect(coin)}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <TrendingUp className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="flex-1 truncate">{coin.name}</span>
                    <Badge
                      variant="secondary"
                      className="text-xs font-mono uppercase shrink-0"
                    >
                      {coin.symbol.toUpperCase()}
                    </Badge>
                    <CommandShortcut>↵</CommandShortcut>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {/* Footer */}
            {!isPending && !isSearching && results.length > 0 && (
              <>
                <CommandSeparator />
                <div className="flex items-center justify-between px-4 py-2 text-xs text-muted-foreground">
                  <span>
                    {isFullListLoaded
                      ? `${coins.length.toLocaleString()} coins loaded`
                      : "Fetching full list..."}
                  </span>
                  <span>ESC to close</span>
                </div>
              </>
            )}
          </CommandList>
        </CommandDialog>
      </div>
    </>
  );
};

export default SearchCommand;

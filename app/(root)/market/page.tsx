import Categories from "@/components/market/Categories";
import CoinOverview from "@/components/market/CoinOverview";
import {
  CategoriesFallback,
  CoinOverviewFallback,
  TrendingCoinsFallback,
} from "@/components/market/fallback";
import TrendingCoins from "@/components/market/TrendingCoins";
import { Suspense } from "react";

const Market = () => {
  return (
    <div>
      <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 items-start lg:items-center gap-6">
        <Suspense fallback={<CoinOverviewFallback />}>
          <CoinOverview />
        </Suspense>

        <Suspense fallback={<TrendingCoinsFallback />}>
          <TrendingCoins />
        </Suspense>
      </section>

      <section className="w-full mt-7 space-y-4">
        <Suspense fallback={<CategoriesFallback />}>
          <Categories />
        </Suspense>
      </section>
    </div>
  );
};

export default Market;

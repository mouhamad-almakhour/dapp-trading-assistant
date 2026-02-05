import { getCategoriesWithMarketData } from "@/lib/actions/coingecko.actions";
import DataTable from "@/components/DataTable";
import Image from "next/image";
import { cn, formatCurrency, formatPercentage } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";
import { CategoriesFallback } from "./fallback";

const Categories = async () => {
  try {
    const categories = await getCategoriesWithMarketData();

    const columns: DataTableColumn<Category>[] = [
      {
        header: "Category",
        cell: (category) => category.name,
      },
      {
        header: "Top Gainers",
        cell: (category) =>
          category.top_3_coins.map((coin) => (
            <Image src={coin} alt={coin} key={coin} width={28} height={28} />
          )),
      },
      {
        header: "24h Change",
        cell: (category) => {
          const isTrendingUp = category.market_cap_change_24h > 0;

          return (
            <div
              className={cn(
                "change-cell",
                isTrendingUp ? "text-green-500" : "text-red-500",
              )}
            >
              <p className="flex items-center">
                {formatPercentage(category.market_cap_change_24h)}
                {isTrendingUp ? (
                  <TrendingUp width={16} height={16} />
                ) : (
                  <TrendingDown width={16} height={16} />
                )}
              </p>
            </div>
          );
        },
      },
      {
        header: "Market Cap",
        cell: (category) => formatCurrency(category.market_cap),
      },
      {
        header: "24h Volume",
        cell: (category) => formatCurrency(category.volume_24h),
      },
    ];

    return (
      <div id="categories" className="custom-scrollbar">
        <h4>Top Categories</h4>

        <DataTable
          columns={columns}
          data={categories?.slice(0, 10)}
          rowKey={(_, index) => index}
        />
      </div>
    );
  } catch (error) {
    console.error("Error fetching categories:", error);
    return <CategoriesFallback />;
  }
};

export default Categories;

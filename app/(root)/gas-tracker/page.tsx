import { ActiveAlerts } from "@/components/ActiveAlerts";
import { GasWidget } from "@/components/GasWidget";
import { getGasPrice } from "@/lib/actions/etherscan.actions";

const GasTracker = async () => {
  let gas: GasPriceData | null = null;
  try {
    gas = await getGasPrice();
  } catch (e) {
    console.error("Failed to fetch gas price:", e);
  }

  return (
    <div className="space-y-6">
      <GasWidget gas={gas} />
      <ActiveAlerts gas={gas} />
    </div>
  );
};

export default GasTracker;

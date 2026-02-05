import { ActiveAlerts } from "@/components/dashboard/ActiveAlerts";
import { GasMiniWidget } from "@/components/dashboard/GasMiniWidget";
import { getGasPrice } from "@/lib/actions/coingecko.actions";

const GasTracker = async () => {
  const gas = await getGasPrice();

  return (
    <div className="space-y-6">
      <GasMiniWidget gas={gas} />
      <ActiveAlerts gas={gas} />
    </div>
  );
};

export default GasTracker;

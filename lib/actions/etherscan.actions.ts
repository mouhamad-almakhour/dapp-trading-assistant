"use server";

const ETHERSCAN_GAS_TRACKER_URL = process.env.ETHERSCAN_GAS_TRACKER_URL;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

if (!ETHERSCAN_GAS_TRACKER_URL) throw new Error("Could not get base url");
if (!ETHERSCAN_API_KEY) throw new Error("Could not get api key");

async function fetchGasOracle(apiKey: string) {
  const url = `${ETHERSCAN_GAS_TRACKER_URL}${apiKey}`;

  const res = await fetch(url, { next: { revalidate: 300 } });

  if (!res.ok) {
    throw new Error(`Etherscan error: ${res.status}`);
  }

  const data = await res.json();

  if (data.status !== "1") {
    throw new Error(`Etherscan API error: ${data.message}`);
  }

  return data.result;
}

// Helper: get gas price from ethereum network
export async function getGasPrice() {
  const gas = await fetchGasOracle(ETHERSCAN_API_KEY!);

  const slow = Number(gas.SafeGasPrice);
  const standard = Number(gas.ProposeGasPrice);
  const fast = Number(gas.FastGasPrice);

  const data: GasPriceData = {
    slow,
    standard,
    fast,
    updatedAt: Date.now(),
  };
  return data;
}

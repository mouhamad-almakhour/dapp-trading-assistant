import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({
  id: "dapp-trading-assistant",
  ai: { gemini: process.env.GEMINI_API_KEY! },
});

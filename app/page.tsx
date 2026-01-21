import { Button } from "@/components/ui/button";
import React from "react";

const Home = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-center text-6xl text-white">
        The #1 Dapp Trading Assistant <br />
        for your crypto needs
      </h1>
      <p className="text-center text-white mt-5">
        Real-time gas prices, token swaps, and market insights All in one palce!
      </p>
      <Button className="flex flex-col items-center justify-center mt-10">
        Explore it Now!
      </Button>
    </section>
  );
};

export default Home;

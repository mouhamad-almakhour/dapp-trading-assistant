"use client";

import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const ExploreBtn = () => {
  return (
    <Button variant="ghost" size="lg" className="btn-explore">
      <a href="/dashboard">Explore Now</a>
      <ArrowDown size={20} />
    </Button>
  );
};

export default ExploreBtn;

"use client";

import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ExploreBtn = () => {
  return (
    <Button variant="ghost" size="lg" className="btn-explore">
      <Link href="/sign-in">Explore Now</Link>
      <ArrowDown size={20} />
    </Button>
  );
};

export default ExploreBtn;

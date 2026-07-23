"use client";
import SearchCommand from "@/components/SearchCommand";

const NavItems = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-10 p-2 font-medium">
      <div className="sm:ml-auto mt-2 sm:mt-0">
        <SearchCommand />
      </div>
    </div>
  );
};

export default NavItems;

import Image from "next/image";
import Link from "next/link";
import NavItems from "@/components/Navitems";

const Header = () => {
  return (
    <header className="sticky top-0 header">
      <div className="container header-wrapper">
        <Link href="/">
          <Image
            src="icons/logo.svg"
            alt="Dapp logo"
            width={140}
            height={32}
            className="h-8 w-auto cursor-pointer"
          />
        </Link>
        <NavItems />
      </div>
    </header>
  );
};

export default Header;

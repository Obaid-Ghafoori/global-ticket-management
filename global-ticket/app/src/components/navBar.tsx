import Link from "next/link";
import Image from "next/image";
import globoLogo from "@/public/obaid-1.png";

export default function NavBar() {
  return (
    <nav className="flex justify-between items-center mt-5">
      <Link href={"/"}>
        <Image
          src={globoLogo}
          alt="Global tickets logo"
          width={250}
          height={100}
        />
      </Link>
      <Link className='bg-slate-700 font-bold p-2 hover:bg-slate-500'
        href={'/addItem'}>Add Item</Link>
    </nav>
  );
}

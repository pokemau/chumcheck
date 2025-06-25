import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="h-16 border-b-2 flex justify-between">

      <div className="flex items-center gap-2 h-full">
        <Image alt="Chumcheck logo"
          width={167 / 5}
          height={165 / 5}
          src='/launchlab_logo.png' />
        <h1 className="font-extrabold text-xl">ChumCheck</h1>
      </div>

      <div className="flex h-full gap-10 items-center text-sm">
        <Link className="hover:text-primary" href='/'>Home</Link>
        <Link className="hover:text-primary" href='/'>How it Works</Link>
        <Link className="hover:text-primary" href='/'>About Us</Link>
        <Link className="hover:text-primary" href='/login'>Login</Link>
      </div>
    </nav>
  )

}

export default Navbar;

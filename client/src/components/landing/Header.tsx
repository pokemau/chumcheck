import Image from "next/image";
import Link from "next/link";

const Header = () => {

  return (
    <header
      className="fixed left-1/2 top-0 z-10 flex h-16 w-screen -translate-x-1/2 justify-center text-flutter-gray transition-all duration-300 ease-in-out dark:text-flutter-white"
    >
      <nav className="flex h-16 w-4/5 items-center p-[var(--navbar-padding,0.5rem)] px-0">
        <div className="flex flex-1 cursor-pointer gap-2">
          <Image
            src="/logo.png"
            alt="citeams_logo"
            className="h-7 w-7"
            width={167 / 5}
            height={165 / 5}
          />
          <Link href="/" className="cursor-pointer text-xl font-black normal-case">ChumCheck</Link>
        </div>
        <div className="flex-none font-medium">
          <ul className="flex flex-1 cursor-pointer items-center gap-7 text-[15px]">
            <li className="hover:text-flutter-blue active:scale-95">
              <a href="#hero">Home</a>
            </li>
            <li className="hover:text-flutter-blue active:scale-95">
              <a href="#howitwork">How it Works</a>
            </li>
            <li className="hover:text-flutter-blue active:scale-95">
              <a href="#aboutus">About Us</a>
            </li>
            <li className="hover:text-flutter-blue active:scale-95">
              <a data-sveltekit-reload href="/login">Login</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header;

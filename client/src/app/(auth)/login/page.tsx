import Image from "next/image";
import Link from "next/link";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <div className="flex h-full w-full">
      <div className="bg-muted/40 text-flutter-gray dark:text-flutter-white relative flex h-full flex-1 flex-col items-center rounded-bl-xl rounded-tl-xl">
        <div className="absolute flex w-full cursor-pointer items-center gap-2 p-5">
          <Image
            src="/launchlab_logo.png"
            alt="citeams_logo"
            className="h-7 w-7"
            width={100}
            height={100}
          />
          <Link
            href="/"
            className="cursor-pointer text-xl font-black normal-case"
          >
            ChumCheck
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <Image
            width={100}
            height={100}
            src="/loginv2.svg"
            alt=""
            className="h-3/4 w-3/4"
          />
        </div>
      </div>
      <div className="bg-background text-flutter-gray dark:text-flutter-white flex h-full flex-1 items-center justify-center rounded-br-xl rounded-tr-xl">

        <LoginForm />
      </div>
    </div>
  );
};

export default Login;

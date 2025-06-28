import Image from "next/image";
import Link from "next/link";
import SignupForm from "./SignupForm";

const Register = () => {
  return (
    <div className="flex h-full w-full">
      <div className="relative flex h-full w-[50%] flex-1 flex-col items-center rounded-bl-xl rounded-tl-xl bg-muted/40 text-flutter-gray dark:text-flutter-white">
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
            src="/register.svg"
            alt=""
            className="h-3/4 w-3/4"
            width={100}
            height={100}
          />
        </div>
      </div>
      <div className="flex h-full flex-1 items-center justify-center rounded-br-xl rounded-tr-xl bg-background text-flutter-gray dark:text-flutter-white">
        <form method="post" className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Register</h1>
              <p className="text-balance text-[15px] text-muted-foreground">
                Enter all information below to create an account
              </p>
            </div>

            <SignupForm />

            <div className="mt-4 text-center text-sm mr-2">
              Already have an account?
              <Link href="/login" className="underline ml-1">
                Login
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

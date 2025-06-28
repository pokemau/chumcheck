'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginUser } from "@/services/auth.service";
import Image from "next/image";
import Link from "next/link";

const Login = () => {
  async function submit(e: any) {
    e.preventDefault()
    await loginUser({email: "rentillosa90@gmail.com", password: "1"});
  }
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
        <form method="post" className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-muted-foreground text-balance text-[15px]">
                Enter your email below to login to your account
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label>Password</Label>
                </div>
                <Input name="password" id="password" type="password" required />
              </div>
              <Button className="w-full" onClick={submit}>
                Login
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?
              <a href="/register" className="underline ml-1">
                Sign up
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

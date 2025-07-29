'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginUser } from "@/services/server/auth.service";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";


const LoginForm = () => {
  const [state, action] = useActionState(loginUser, undefined);

  useEffect(() => {
    if (state?.message) {
      if (state.success) {
        toast.success(state.message);
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  return (
    <form action={action} className="flex items-center justify-center py-12">
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
            {state?.error?.email && (
              <p className="text-sm text-red-500">{state.error.email}</p>
            )}
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label>Password</Label>
            </div>
            <Input name="password" id="password" type="password" required />

            {state?.error?.password && (
              <p className="text-sm text-red-500">{state.error.password}</p>
            )}
          </div>
          <Button className="w-full" type='submit'>
            Login
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?
          <Link href="/register" className="underline ml-1">
            Sign up
          </Link>
        </div>
      </div>
    </form>

  )
}

export default LoginForm;

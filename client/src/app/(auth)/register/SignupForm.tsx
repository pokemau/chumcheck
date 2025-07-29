"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { registerUser } from "@/services/server/auth.service"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"

const SignupForm = () => {
  const [state, action] = useActionState(registerUser, undefined)

  useEffect(() => {
    if (state?.message) {
      if (state.success) {
        toast.success(state.message)
      } else {
        toast.error(state.message)
      }
    }
  }, [state])

  return (
    <form action={action} className="flex items-center justify-center">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label>First name</Label>
            </div>
            <Input name="firstName" id="firstName" type="text" required placeholder="John" />
            {state?.error?.firstName && <p className="text-sm text-red-500">{state.error.firstName}</p>}
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label>Last name</Label>
            </div>
            <Input name="lastName" id="lastName" type="text" required placeholder="Doe" />

            {state?.error?.lastName && <p className="text-sm text-red-500">{state.error.lastName}</p>}
          </div>
          <div className="grid gap-2">
            <Label>Email</Label>
            <Input name="email" id="email" type="email" placeholder="johndoe@example.com" required />

            {state?.error?.email && <p className="text-sm text-red-500">{state.error.email}</p>}
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label>Password</Label>
            </div>
            <Input name="password" id="password" type="password" required />

            {state?.error?.password && <p className="text-sm text-red-500">{state.error.password}</p>}
            {state?.error?.repeatPassword && <p className="text-sm text-red-500">{state.error.repeatPassword}</p>}
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label>Repeat Password</Label>
            </div>
            <Input name="repeatPassword" id="repeatPassword" type="password" required />

            {state?.error?.repeatPassword && <p className="text-sm text-red-500">{state.error.repeatPassword}</p>}
          </div>
          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </div>
      </div>
    </form>
  )
}

export default SignupForm

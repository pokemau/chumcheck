"use client";

import { signup } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";

const SignupForm = () => {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <form action={action} className="flex items-center justify-center">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label>First name</Label>
            </div>
            <Input
              name="firstName"
              id="firstName"
              type="text"
              required
              placeholder="John"
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label>Last name</Label>
            </div>
            <Input
              name="lastName"
              id="lastName"
              type="text"
              required
              placeholder="Doe"
            />
          </div>
          <div className="grid gap-2">
            <Label>Email</Label>
            <Input
              name="email"
              id="email"
              type="email"
              placeholder="johndoe@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label>Password</Label>
            </div>
            <Input name="password" id="password" type="password" required />
          </div>
          {/* <div className="grid gap-2"> */}
          {/*   <div className="flex items-center"> */}
          {/*     <Label>Repeat Password</Label> */}
          {/*   </div> */}
          {/*   <Input */}
          {/*     name="repeatPassword" */}
          {/*     id="repeatPassword" */}
          {/*     type="password" */}
          {/*     required */}
          {/*   /> */}
          {/* </div> */}
          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SignupForm;

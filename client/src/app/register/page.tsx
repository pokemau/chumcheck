'use client'

import { registerUser } from "@/lib/api/auth";
import { useState } from "react";

const Register = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerUser();
    // handle registration logic here
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 rounded shadow bg-white dark:bg-card">
      <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label htmlFor="firstName" className="block mb-1 font-medium">
            First name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="John"
            value={form.firstName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
            required
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block mb-1 font-medium">
            Last name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Doe"
            value={form.lastName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="johndoe@example.com"
            value={form.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
            required
          />
        </div>

        <div>
          <label htmlFor="repeatPassword" className="block mb-1 font-medium">
            Repeat Password
          </label>
          <input
            id="repeatPassword"
            name="repeatPassword"
            type="password"
            value={form.repeatPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-primary-foreground py-2 rounded font-semibold hover:opacity-90 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;

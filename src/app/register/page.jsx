"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="bg-[#fff2ee] p-8 rounded-2xl shadow-md w-full max-w-md">
        <div className="flex justify-center mb-6">
                  <Image
                    src="/assets/petskart-logo1.png"
                    alt="logo"
                    width={130}
                    height={40}
                  />
                </div>
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full p-3 border rounded-lg outline-none"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg outline-none"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg outline-none"
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-[#7f5539] text-white py-3 rounded-lg">
            Register
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link href={"/login"} className="text-[#7f5539] font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

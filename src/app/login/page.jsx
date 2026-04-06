"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-[#fff2ee] rounded-2xl shadow-md p-8">
        <div className="flex justify-center mb-6">
          <Image
            src="/assets/petskart-logo1.png"
            alt="logo"
            width={130}
            height={40}
          />
        </div>

        <h2 className="text-2xl font-semibold text-center mb-6">
          Login to your account
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            className="w-full p-3 border rounded-lg outline-none "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg outline-none "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-[#7f5539] text-white py-3 rounded-lg font-medium hover:opacity-90 ">
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-600">
          Don’t have an Account?{" "}
          <Link href={"/register"} className="text-[#7f5539] font-medium">
            Register
          </Link>
        </p>
        <p className="text-sm text-center text-[#7f5539] "><Link href={"/admin-dashboard"}>Admin</Link></p>
      </div>
    </div>
  );
}

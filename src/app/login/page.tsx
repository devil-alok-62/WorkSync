"use client";

import Link from "next/link";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { ArrowLeft } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";

const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="fixed inset-0 -z-10">
        <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-cyan-500/30 blur-3xl" />
        <div className="absolute right-10 top-40 h-72 w-72 rounded-full bg-fuchsia-500/30 blur-3xl" />
      </div>
      <div className="mb-6">
        <Button asChild variant="ghost" className="w-60 mt-6">
          <Link href="/" className="inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </Button>
      </div>
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-20">
        <div className="mx-auto w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Login
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                Sign in to your account
              </h2>
            </div>
            <div className="rounded-full bg-blue-500/15 p-3 text-blue-300">
              <Lock className="h-5 w-5" />
            </div>
          </div>

          <form onSubmit={handleSignIn} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-slate-200"
              >
                Email address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-slate-200"
              >
                Password
              </label>

              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                />

                {/* Show / Hide Password Button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm text-slate-400">
              <Link
                href="/register"
                className="text-blue-300 hover:text-blue-200"
              >
                Need an account?
              </Link>
              <Link href="#" className="hover:text-white">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full py-5 hover:bg-gray-700/20">
              Sign in
            </Button>
          </form>

          <div className="flex items-center justify-center">
            <hr className="grow border-gray-500/20" />
            <span className="mx-4 text-sm text-gray-500">OR</span>
            <hr className="grow border-gray-500/20" />
          </div>

          <Button
            variant="default"
            className="w-full cursor-pointer py-5 hover:bg-gray-700/20"
            onClick={async () => {
              await signIn("google", {
                callbackUrl: "/",
              });
            }}
          >
            <FcGoogle className="h-6 w-6" />
            <span className="mr-2">Sign in with Google</span>
          </Button>

          <div className="mt-2 border-t border-white/10 pt-6">
            <p className="text-center text-sm text-slate-400">
              Don’t have an account?
              <Link
                href="/register"
                className="font-medium text-blue-300 hover:text-blue-200"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;

"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
  CheckCircle2,
  Users,
  Zap,
  BarChart3,
  ArrowRight,
  Menu,
} from "lucide-react";
import { useState } from "react";

export default function HomePage() {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Experience blazing-fast performance with our optimized platform.",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Work seamlessly with your team in real-time.",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description:
        "Get deep insights into your project metrics and performance.",
    },
    {
      icon: CheckCircle2,
      title: "Task Management",
      description: "Organize and track tasks with ease.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-500">
                <Zap className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold">WorkSync</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden gap-8 md:flex">
              <Link
                href="#features"
                className="transition-colors hover:text-blue-400"
              >
                Features
              </Link>
              <Link href="#" className="transition-colors hover:text-blue-400">
                Pricing
              </Link>
              <Link href="#" className="transition-colors hover:text-blue-400">
                About
              </Link>
              <Link href="#" className="transition-colors hover:text-blue-400">
                Contact
              </Link>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              {session ? (
                <Link href="/dashboard">
                  <Button variant="default">Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link href="/login" className="hidden sm:block">
                    <Button variant="ghost">Sign in</Button>
                  </Link>
                  <Link href="/register">
                    <Button variant="default">Get Started</Button>
                  </Link>
                </>
              )}
              <button
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="border-t border-white/10 py-4 md:hidden">
              <div className="space-y-3">
                <Link
                  href="#features"
                  className="block transition-colors hover:text-blue-400"
                >
                  Features
                </Link>
                <Link
                  href="#"
                  className="block transition-colors hover:text-blue-400"
                >
                  Pricing
                </Link>
                <Link
                  href="#"
                  className="block transition-colors hover:text-blue-400"
                >
                  About
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 -z-20 bg-slate-950" />

        {/* Gradient Orbs */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-20 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-[120px]" />
          <div className="absolute right-0 top-1/2 h-[400px] w-[400px] rounded-full bg-purple-500/20 blur-[120px]" />
          <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-cyan-500/20 blur-[120px]" />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:70px_70px]" />

        <div className="mx-auto max-w-7xl px-6 text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl">
            <span className="mr-2 h-2 w-2 rounded-full bg-green-500" />
            Trusted by 10,000+ teams worldwide
          </div>

          {/* Heading */}
          <h1 className="mx-auto max-w-5xl text-6xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl">
            Manage Projects
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Faster Than Ever
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-400 md:text-xl">
            WorkSync helps teams organize tasks, collaborate seamlessly, track
            progress in real-time, and deliver projects on time with a beautiful
            modern workspace.
          </p>

          {/* Buttons */}
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href={session ? "/dashboard" : "/register"}>
              <Button size="lg" className="h-14 rounded-full px-8 text-base">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            <Button
              size="lg"
              variant="outline"
              className="h-14 rounded-full border-white/20 bg-white/5 px-8 backdrop-blur-xl"
            >
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-20 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <h3 className="text-4xl font-bold text-white">10K+</h3>
              <p className="mt-2 text-slate-400">Active Users</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <h3 className="text-4xl font-bold text-white">50K+</h3>
              <p className="mt-2 text-slate-400">Projects Managed</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <h3 className="text-4xl font-bold text-white">99.9%</h3>
              <p className="mt-2 text-slate-400">Uptime</p>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section
        id="features"
        className="
        relative
        flex
        min-h-screen
        items-center
        overflow-hidden
        border-t
        border-white/10
        bg-slate-950
        py-24
      "
      >
        {/* Background Glow */}
        <div className="absolute inset-0 -z-10">
          <div
            className="
            absolute
            left-1/2
            top-20
            h-[500px]
            w-[500px]
            -translate-x-1/2
            rounded-full
            bg-blue-500/20
            blur-[120px]
          "
          />

          <div
            className="
            absolute
            bottom-0
            right-0
            h-[400px]
            w-[400px]
            rounded-full
            bg-purple-500/20
            blur-[120px]
          "
          />
        </div>

        <div className="mx-auto w-full max-w-7xl px-6">
          {/* Heading */}

          <div className="mx-auto max-w-3xl text-center">
            <span
              className="
            rounded-full
            border
            border-white/10
            bg-white/5
            px-4
            py-2
            text-sm
            text-blue-300
            backdrop-blur-xl
            "
            >
              Powerful Features
            </span>

            <h2
              className="
            mt-6
            text-5xl
            font-bold
            tracking-tight
            text-white
            md:text-6xl
            "
            >
              Everything you need
              <br />
              <span
                className="
              bg-gradient-to-r
              from-blue-400
              to-purple-400
              bg-clip-text
              text-transparent
              "
              >
                to manage projects
              </span>
            </h2>

            <p
              className="
            mt-6
            text-lg
            text-slate-400
            "
            >
              Manage tasks, collaborate with your team, and deliver projects
              faster.
            </p>
          </div>

          {/* Cards */}

          <div
            className="
          mt-16
          grid
          gap-6
          md:grid-cols-2
          lg:grid-cols-4
          "
          >
            {features.map((feature: any) => {
              const Icon = feature.icon;

              return (
                <Card
                  key={feature.title}
                  className="
                group
                border-white/10
                bg-white/5
                backdrop-blur-xl
                transition-all
                duration-300
                hover:-translate-y-3
                hover:border-blue-500/50
                "
                >
                  <CardContent className="p-8">
                    <div
                      className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    from-blue-500/20
                    to-purple-500/20
                    "
                    >
                      <Icon
                        className="
                      h-7
                      w-7
                      text-blue-400
                      "
                      />
                    </div>

                    <h3
                      className="
                    mt-6
                    text-xl
                    font-semibold
                    text-white
                    "
                    >
                      {feature.title}
                    </h3>

                    <p
                      className="
                    mt-3
                    leading-7
                    text-slate-400
                    "
                    >
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-32">
        {/* Background Glow */}
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute left-1/2 top-0 h-96 w-96
      -translate-x-1/2 rounded-full
      bg-blue-500/20 blur-[120px]"
          />

          <div
            className="absolute bottom-0 right-0 h-96 w-96
      rounded-full
      bg-purple-500/20 blur-[120px]"
          />
        </div>

        <div className="mx-auto max-w-7xl px-6">
          <div
            className="
        relative overflow-hidden
        rounded-[32px]
        border border-white/10
        bg-white/5
        p-10
        text-center
        backdrop-blur-xl
        shadow-2xl
        sm:p-16
      "
          >
            <div className="mb-4 inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-slate-300">
              🚀 Start building faster today
            </div>

            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Ready to boost your{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                productivity?
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
              Join thousands of teams already using WorkSync to manage projects,
              collaborate efficiently, and ship work faster.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href={session ? "/dashboard" : "/register"}>
                <Button
                  size="lg"
                  className="
              h-12
              rounded-full
              px-8
              shadow-lg
              shadow-blue-500/20
            "
                >
                  Start Free Trial
                </Button>
              </Link>

              {!session && (
                <Link href="/login">
                  <Button
                    size="lg"
                    variant="outline"
                    className="
                h-12
                rounded-full
                border-white/20
                bg-white/5
                text-white
                hover:bg-white/10
              "
                  >
                    Sign In
                  </Button>
                </Link>
              )}
            </div>

            {/* Stats */}

            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              <div>
                <h3 className="text-3xl font-bold">10K+</h3>
                <p className="text-sm text-slate-400">Active Users</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold">50K+</h3>
                <p className="text-sm text-slate-400">Tasks Completed</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold">99%</h3>
                <p className="text-sm text-slate-400">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-950 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-5">
            {/* Brand */}
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-500">
                  <Zap className="h-6 w-6" />
                </div>
                <span className="text-xl font-bold">WorkSync</span>
              </Link>
              <p className="mt-4 text-slate-400">
                The modern task management platform for teams that want to
                deliver projects faster.
              </p>
            </div>

            {/* Product */}
            <div>
              <h3 className="font-semibold">Product</h3>
              <ul className="mt-4 space-y-2 text-slate-400">
                <li>
                  <Link href="#" className="transition hover:text-white">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition hover:text-white">
                    Security
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold">Company</h3>
              <ul className="mt-4 space-y-2 text-slate-400">
                <li>
                  <Link href="#" className="transition hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition hover:text-white">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold">Legal</h3>
              <ul className="mt-4 space-y-2 text-slate-400">
                <li>
                  <Link href="#" className="transition hover:text-white">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition hover:text-white">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-8">
            <p className="text-center text-slate-400">
              © 2026 WorkSync. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

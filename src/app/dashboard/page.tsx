"use client";

import { useSession } from "next-auth/react";
import { BarChart3, Users, Calendar, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { data: session } = useSession();

  const stats = [
    {
      label: "Total Tasks",
      value: "24",
      icon: CheckCircle2,
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    },
    {
      label: "Team Members",
      value: "8",
      icon: Users,
      color: "bg-green-500/10 text-green-600 dark:text-green-400",
    },
    {
      label: "This Week",
      value: "5",
      icon: Calendar,
      color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    },
    {
      label: "Performance",
      value: "92%",
      icon: BarChart3,
      color: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
    },
  ];

  const recentTasks = [
    {
      id: 1,
      title: "Design new landing page",
      status: "In Progress",
      priority: "High",
    },
    {
      id: 2,
      title: "Review pull requests",
      status: "Pending",
      priority: "Medium",
    },
    {
      id: 3,
      title: "Update documentation",
      status: "Completed",
      priority: "Low",
    },
    {
      id: 4,
      title: "Client presentation prep",
      status: "In Progress",
      priority: "High",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="rounded-3xl border border-border bg-linear-to-br from-background to-background/50 p-8 shadow-sm shadow-muted/20">
        <div className="flex items-center justify-between">
          <div>
            <h1
              className="text-4xl 
              font-bold 
              bg-gradient-to-r 
              from-pink-500
              to-purple-500
              bg-clip-text
              text-transparent"
            >
              Welcome back, {session?.user?.name || "User"}! 👋
            </h1>
            <p className="mt-2 text-muted-foreground">
              Here's what's happening with your projects today.
            </p>
          </div>
          {session?.user?.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={session.user.image}
              alt={session.user.name || "User"}
              className="h-20 w-20 rounded-full border-2 border-border object-cover"
            />
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-border bg-background p-6 shadow-sm shadow-muted/20 transition-all hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-3xl font-bold text-foreground">
                    {stat.value}
                  </p>
                </div>
                <div className={`rounded-xl p-3 ${stat.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4 h-1 overflow-hidden rounded-full bg-muted">
                <div className="h-full w-3/4 rounded-full bg-linear-to-r from-blue-500 to-purple-500" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Tasks */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-border bg-background p-6 shadow-sm shadow-muted/20">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">
                Recent Tasks
              </h2>
              <Link href="/dashboard/profile">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {recentTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between rounded-xl border border-border/50 bg-muted/30 p-4 transition-all hover:bg-muted/50"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">
                      {task.title}
                    </h3>
                    <div className="mt-1 flex items-center gap-3">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                          task.status === "Completed"
                            ? "bg-green-500/20 text-green-700 dark:text-green-400"
                            : task.status === "In Progress"
                              ? "bg-blue-500/20 text-blue-700 dark:text-blue-400"
                              : "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400"
                        }`}
                      >
                        {task.status}
                      </span>
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                          task.priority === "High"
                            ? "bg-red-500/20 text-red-700 dark:text-red-400"
                            : task.priority === "Medium"
                              ? "bg-orange-500/20 text-orange-700 dark:text-orange-400"
                              : "bg-gray-500/20 text-gray-700 dark:text-gray-400"
                        }`}
                      >
                        {task.priority}
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    →
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <div className="rounded-2xl border border-border bg-background p-6 shadow-sm shadow-muted/20">
            <h2 className="mb-6 text-xl font-semibold text-foreground">
              Quick Links
            </h2>
            <div className="space-y-3">
              <Link href="/dashboard/profile">
                <Button variant="outline" className="w-full justify-start">
                  👤 Profile Settings
                </Button>
              </Link>
              <Button variant="outline" className="w-full justify-start">
                📋 Create New Task
              </Button>
              <Button variant="outline" className="w-full justify-start">
                👥 Invite Team Member
              </Button>
              <Button variant="outline" className="w-full justify-start">
                📊 View Reports
              </Button>
            </div>
          </div>

          {/* Info Card */}
          <div className="mt-6 rounded-2xl border border-border bg-linear-to-br from-purple-500/10 to-blue-500/10 p-6 shadow-sm shadow-muted/20">
            <h3 className="font-semibold text-foreground">💡 Tip</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Keep your profile updated to help your team identify you across
              all projects.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

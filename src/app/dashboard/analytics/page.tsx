"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { Activity, CheckCircle2, Clock, TrendingUp, Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const taskData = [
  {
    month: "Jan",
    tasks: 120,
  },
  {
    month: "Feb",
    tasks: 240,
  },
  {
    month: "Mar",
    tasks: 360,
  },
  {
    month: "Apr",
    tasks: 520,
  },
  {
    month: "May",
    tasks: 700,
  },
];

const teamData = [
  {
    name: "Dev",
    value: 90,
  },
  {
    name: "Design",
    value: 75,
  },
  {
    name: "Marketing",
    value: 60,
  },
  {
    name: "Sales",
    value: 85,
  },
];

export default function AnalyticsPage() {
  return (
    <div
      className="
relative
min-h-screen
overflow-hidden
bg-background
p-6
text-foreground
"
    >
      {/* Background Glow */}

      <div className="absolute inset-0 -z-10">
        <div
          className="
absolute
left-10
top-20
h-96
w-96
rounded-full
bg-pink-500/10
blur-[120px]
"
        />

        <div
          className="
absolute
right-10
top-40
h-96
w-96
rounded-full
bg-purple-500/10
blur-[120px]
"
        />
      </div>

      {/* Header */}

      <div className="mb-10">
        <h1
          className="
text-4xl
font-bold
text-primary
"
        >
          Analytics
        </h1>

        <p
          className="
mt-2
text-muted-foreground
"
        >
          Track your team's productivity and project growth.
        </p>
      </div>

      {/* Stats */}

      <div
        className="
grid
gap-6
sm:grid-cols-2
lg:grid-cols-4
"
      >
        <StatsCard title="Total Tasks" value="12,450" icon={<CheckCircle2 />} />

        <StatsCard title="Completed" value="9,820" icon={<TrendingUp />} />

        <StatsCard title="Team Members" value="48" icon={<Users />} />

        <StatsCard title="Pending" value="320" icon={<Clock />} />
      </div>

      {/* Charts */}

      <div
        className="
mt-8
grid
gap-6
lg:grid-cols-2
"
      >
        <Card
          className="
border-border/50
bg-card/60
backdrop-blur-xl
shadow-xl
"
        >
          <CardHeader>
            <CardTitle>Task Growth</CardTitle>
          </CardHeader>

          <CardContent
            className="
h-[350px]
"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={taskData}>
                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="tasks"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.15}
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card
          className="
border-border/50
bg-card/60
backdrop-blur-xl
shadow-xl
"
        >
          <CardHeader>
            <CardTitle>Team Performance</CardTitle>
          </CardHeader>

          <CardContent
            className="
h-[350px]
"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={teamData}>
                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar dataKey="value" fill="hsl(var(--primary))" radius={10} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Activity */}

      <Card
        className="
mt-8
border-border/50
bg-card/60
backdrop-blur-xl
shadow-xl
"
      >
        <CardHeader>
          <CardTitle
            className="
flex
items-center
gap-2
"
          >
            <Activity
              className="
text-primary
"
            />
            Recent Activity
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div
            className="
space-y-5
"
          >
            <ActivityItem title="New project created" time="2 minutes ago" />

            <ActivityItem title="Alex completed 15 tasks" time="1 hour ago" />

            <ActivityItem title="New team member joined" time="3 hours ago" />

            <ActivityItem title="Deadline updated" time="Yesterday" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatsCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <Card
      className="
border-border/50
bg-card/60
backdrop-blur-xl
transition
hover:border-primary/40
"
    >
      <CardContent
        className="
p-6
"
      >
        <div
          className="
flex
items-center
justify-between
"
        >
          <div>
            <p
              className="
text-sm
text-muted-foreground
"
            >
              {title}
            </p>

            <h2
              className="
mt-2
text-3xl
font-bold
"
            >
              {value}
            </h2>
          </div>

          <div
            className="
rounded-xl
bg-primary/10
p-3
text-primary
"
          >
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ActivityItem({ title, time }: { title: string; time: string }) {
  return (
    <div
      className="
flex
items-center
justify-between
border-b
border-border
pb-4
"
    >
      <div
        className="
flex
items-center
gap-3
"
      >
        <div
          className="
h-3
w-3
rounded-full
bg-primary
"
        />

        <p>{title}</p>
      </div>

      <span
        className="
text-sm
text-muted-foreground
"
      >
        {time}
      </span>
    </div>
  );
}

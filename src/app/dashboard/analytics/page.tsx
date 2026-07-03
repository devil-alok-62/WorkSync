"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { Activity, CheckCircle2, Clock, TrendingUp, Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Task = {
  _id: string;
  title: string;
  status: string;
  priority: string;
  progress: number;
  createdAt: string;
};

type Member = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

const defaultTaskData = [
  { month: "Jan", tasks: 0 },
  { month: "Feb", tasks: 0 },
  { month: "Mar", tasks: 0 },
  { month: "Apr", tasks: 0 },
  { month: "May", tasks: 0 },
  { month: "Jun", tasks: 0 },
  { month: "Jul", tasks: 0 },
  { month: "Aug", tasks: 0 },
  { month: "Sep", tasks: 0 },
  { month: "Oct", tasks: 0 },
  { month: "Nov", tasks: 0 },
  { month: "Dec", tasks: 0 },
];
const defaultTeamData = [
  { name: "Dev", value: 0 },
  { name: "Design", value: 0 },
  { name: "Marketing", value: 0 },
  { name: "Sales", value: 0 },
];

export default function AnalyticsPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [members, setMembers] = useState<Member[]>([]);

  const getTasks = async () => {
    try {
      const res = await fetch("/api/tasks", { cache: "no-store" });
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getMembers = async () => {
    try {
      const res = await fetch("/api/team", { cache: "no-store" });
      const data = await res.json();
      setMembers(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTasks();
    getMembers();
  }, []);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.status === "Completed",
  ).length;
  const pendingTasks = tasks.filter((task) => task.status === "Pending").length;
  const totalMembers = members.length;
  const taskData = useMemo(() => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const counts = months.map((month) => ({ month, tasks: 0 }));

    tasks.forEach((task) => {
      const date = new Date(task.createdAt);
      const month = months[date.getMonth()];
      const monthEntry = counts.find((entry) => entry.month === month);
      if (monthEntry) {
        monthEntry.tasks += 1;
      }
    });

    return counts.slice(0, new Date().getMonth() + 1);
  }, [tasks]);

  const teamData = useMemo(() => {
    const groups = new Map<string, number>();
    members.forEach((member) => {
      const group = member.role.split(" ")[0] || "Other";
      groups.set(group, (groups.get(group) ?? 0) + 1);
    });

    return [...groups.entries()].map(([name, value]) => ({ name, value }));
  }, [members]);

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
        <StatsCard
          title="Total Tasks"
          value={String(totalTasks)}
          icon={<CheckCircle2 />}
        />

        <StatsCard
          title="Completed"
          value={String(completedTasks)}
          icon={<TrendingUp />}
        />

        <StatsCard
          title="Team Members"
          value={String(totalMembers)}
          icon={<Users />}
        />

        <StatsCard
          title="Pending"
          value={String(pendingTasks)}
          icon={<Clock />}
        />
      </div>

      {/* Charts */}

      <div
        className="
mt-8
space-y-6
"
      >
        <Card
          className="
w-full
border-border/50
bg-card/60
backdrop-blur-xl
shadow-xl
"
        >
          {" "}
          <CardHeader>
            <CardTitle>Task Growth</CardTitle>
          </CardHeader>
          <CardContent className="h-136 text-chart-5">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={taskData.length ? taskData : defaultTaskData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
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
w-full
border-border/50
bg-card/60
backdrop-blur-xl
shadow-xl
"
        >
          <CardHeader>
            <CardTitle>Team Performance</CardTitle>
          </CardHeader>

          <CardContent className="h-136 text-chart-5">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={teamData.length ? teamData : defaultTeamData}>
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

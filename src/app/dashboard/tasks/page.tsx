"use client";

import { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";

type Task = {
  _id: string;

  title: string;

  description: string;

  status: string;

  priority: string;

  progress: number;
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [newTask, setNewTask] = useState({
    title: "",

    description: "",

    status: "Pending",

    priority: "Medium",

    progress: 0,
  });

  // =======================
  // GET TASKS
  // =======================

  const getTasks = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/tasks", {
        cache: "no-store",
      });

      const data = await res.json();

      setTasks(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // =======================
  // ADD TASK
  // =======================

  const addTask = async () => {
    if (!newTask.title) {
      alert("Please select task title");

      return;
    }

    try {
      await fetch(
        "/api/tasks",

        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            ...newTask,

            progress: Number(newTask.progress),
          }),
        },
      );

      setNewTask({
        title: "",

        description: "",

        status: "Pending",

        priority: "Medium",

        progress: 0,
      });

      setOpen(false);

      getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  // =======================
  // DELETE TASK
  // =======================

  const deleteTask = async (id: string) => {
    try {
      await fetch(
        `/api/tasks/${id}`,

        {
          method: "DELETE",
        },
      );

      getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  // =======================
  // COMPLETE TASK
  // =======================

  const completeTask = async (id: string) => {
    try {
      await fetch(
        `/api/tasks/${id}`,

        {
          method: "PUT",
        },
      );

      getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Tasks</h1>

          <p className="text-muted-foreground">Manage your project tasks</p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              className="
shadow-lg
"
            >
              + Add Task
            </Button>
          </DialogTrigger>

          <DialogContent
            className="
backdrop-blur-xl
border-white/20
rounded-3xl
"
          >
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
            </DialogHeader>

            <div className="space-y-5">
              <div>
                <label>Task Title</label>

                <Select
                  onValueChange={(value) =>
                    setNewTask({
                      ...newTask,

                      title: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose Task" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="Create Dashboard UI">
                      Create Dashboard UI
                    </SelectItem>

                    <SelectItem value="Authentication System">
                      Authentication System
                    </SelectItem>

                    <SelectItem value="MongoDB Integration">
                      MongoDB Integration
                    </SelectItem>

                    <SelectItem value="Deploy Application">
                      Deploy Application
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label>Description</label>

                <Textarea
                  placeholder="Write task details..."
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask({
                      ...newTask,

                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label>Status</label>

                <Select
                  value={newTask.status}
                  onValueChange={(value) =>
                    setNewTask({
                      ...newTask,

                      status: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>

                    <SelectItem value="In Progress">In Progress</SelectItem>

                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label>Priority</label>

                <Select
                  value={newTask.priority}
                  onValueChange={(value) =>
                    setNewTask({
                      ...newTask,

                      priority: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="High">High</SelectItem>

                    <SelectItem value="Medium">Medium</SelectItem>

                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label>Progress %</label>

                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={newTask.progress}
                  onChange={(e) =>
                    setNewTask({
                      ...newTask,

                      progress: Number(e.target.value),
                    })
                  }
                />
              </div>

              <Button
                onClick={addTask}
                className="
w-full
"
              >
                Create Task
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Input
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md"
      />

      {loading ? (
        <p>Loading tasks...</p>
      ) : filteredTasks.length === 0 ? (
        <p className="text-muted-foreground">No tasks found</p>
      ) : (
        <div
          className="
grid
md:grid-cols-2
lg:grid-cols-3
gap-5
"
        >
          {filteredTasks.map((task) => (
            <Card
              key={task._id}
              className="
bg-white/10
dark:bg-black/30
backdrop-blur-xl
border-white/20
hover:scale-[1.02]
transition
"
            >
              <CardContent className="p-5 space-y-4">
                <div className="flex justify-between">
                  <h2 className="font-semibold">{task.title}</h2>

                  <Badge>{task.priority}</Badge>
                </div>

                <p className="text-sm text-muted-foreground">
                  {task.description}
                </p>

                <Badge variant="outline">{task.status}</Badge>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>

                    <span>{Number(task.progress) || 0}%</span>
                  </div>

                  <Progress value={Number(task.progress) || 0} />
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    disabled={task.status === "Completed"}
                    onClick={() => completeTask(task._id)}
                  >
                    {task.status === "Completed" ? "Completed" : "Complete"}
                  </Button>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteTask(task._id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

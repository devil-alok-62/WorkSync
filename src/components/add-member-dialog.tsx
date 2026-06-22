"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddMemberDialog({ refresh }: { refresh: () => void }) {
  const [open, setOpen] = useState(false);

  const [member, setMember] = useState({
    name: "",

    email: "",

    role: "Frontend Developer",

    status: "Active",
  });

  const addMember = async () => {
    if (!member.name || !member.email) {
      alert("Fill all details");

      return;
    }

    const res = await fetch("/api/team", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(member),
    });

    if (res.ok) {
      setMember({
        name: "",

        email: "",

        role: "Frontend Developer",

        status: "Active",
      });

      setOpen(false);

      refresh();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="
shadow-lg
hover:scale-105
transition
"
        >
          + Add Member
        </Button>
      </DialogTrigger>

      <DialogContent
        className="
backdrop-blur-xl
border
border-white/20
rounded-3xl
shadow-2xl
"
      >
        <DialogHeader>
          <DialogTitle className="text-xl">Add Team Member</DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          <div>
            <label>Name</label>

            <Input
              placeholder="your name"
              value={member.name}
              onChange={(e) =>
                setMember({
                  ...member,

                  name: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label>Email</label>

            <Input
              placeholder="your email"
              value={member.email}
              onChange={(e) =>
                setMember({
                  ...member,

                  email: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label>Role</label>

            <Select
              value={member.role}
              onValueChange={(v) =>
                setMember({
                  ...member,

                  role: v,
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Frontend Developer">
                  Frontend Developer
                </SelectItem>

                <SelectItem value="Backend Developer">
                  Backend Developer
                </SelectItem>

                <SelectItem value="UI Designer">UI Designer</SelectItem>

                <SelectItem value="Project Manager">Project Manager</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label>Status</label>

            <Select
              value={member.status}
              onValueChange={(v) =>
                setMember({
                  ...member,

                  status: v,
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>

                <SelectItem value="Offline">Offline</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={addMember} className="w-full">
            Create Member
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

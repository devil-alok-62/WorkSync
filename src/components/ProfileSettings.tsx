"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useSession } from "next-auth/react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProfileSettings() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { data } = useSession();

  return (
    <div className="my-8 grid gap-6 md:grid-cols-2">
      {/* ================= PROFILE INFORMATION ================= */}
      <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold">Personal Information</h2>

        <div className="space-y-5">
          {data ? (
            <div>
              <Label>Name</Label>

              <Input
                className="mt-2"
                placeholder="Enter your name"
                defaultValue={data.user.name || ""}
              />
            </div>
          ) : (
            <p>Loading...</p>
          )}
          {/* Department Popup */}

          <div>
            <Label>Department</Label>

            <Select>
              <SelectTrigger className="mt-2 w-full">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="development">
                  Software Development
                </SelectItem>

                <SelectItem value="frontend">Frontend Team</SelectItem>

                <SelectItem value="backend">Backend Team</SelectItem>

                <SelectItem value="testing">QA / Testing</SelectItem>

                <SelectItem value="devops">DevOps</SelectItem>

                <SelectItem value="security">Cyber Security</SelectItem>

                <SelectItem value="data">Data Science</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Designation Popup */}

          <div>
            <Label>Designation</Label>

            <Select>
              <SelectTrigger className="mt-2 w-full">
                <SelectValue placeholder="Select designation" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="intern">Software Intern</SelectItem>

                <SelectItem value="junior">
                  Junior Software Developer
                </SelectItem>

                <SelectItem value="frontend-dev">Frontend Developer</SelectItem>

                <SelectItem value="backend-dev">Backend Developer</SelectItem>

                <SelectItem value="fullstack">Full Stack Developer</SelectItem>

                <SelectItem value="senior">Senior Software Engineer</SelectItem>

                <SelectItem value="lead">Team Lead</SelectItem>

                <SelectItem value="manager">Project Manager</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="mt-3">Save Profile</Button>
        </div>
      </div>
      {/* ================= PASSWORD UPDATE ================= */}
      <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold">Update Password</h2>

        <div className="space-y-5">
          {/* Current Password */}
          <div>
            <Label>Current Password</Label>

            <div className="relative mt-2">
              <Input
                type={showCurrent ? "text" : "password"}
                placeholder="Enter current password"
                className="pr-10"
              />

              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showCurrent ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <Label>New Password</Label>

            <div className="relative mt-2">
              <Input
                type={showNew ? "text" : "password"}
                placeholder="Enter new password"
                className="pr-10"
              />

              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <Label>Confirm Password</Label>

            <div className="relative mt-2">
              <Input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm new password"
                className="pr-10"
              />

              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <Button>Update Password</Button>
        </div>
      </div>{" "}
    </div>
  );
}

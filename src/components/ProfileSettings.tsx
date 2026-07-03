"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Eye, EyeOff } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProfileSettings() {
  const { data: session, update: refreshSession } = useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [role, setRole] = useState("");
  const [bio, setBio] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/profile", { cache: "no-store" });
        if (!res.ok) {
          throw new Error("Unable to load profile");
        }
        const data = await res.json();
        setName(data.name || "");
        setEmail(data.email || "");
        setPhone(data.phone || "");
        setLocation(data.location || "");
        setRole(data.role || "");
        setBio(data.bio || "");
        setImageUrl(data.image || "");
        setImagePreview(data.image || "");
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files?.length) {
      return;
    }
    const file = files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const saveProfile = async () => {
    setMessage("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("location", location);
      formData.append("role", role);
      formData.append("bio", bio);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await fetch("/api/profile", {
        method: "PATCH",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage(data.message || "Unable to save profile");
        return;
      }

      setMessage("Profile updated successfully.");
      setImageUrl(data.user.image || imageUrl);
      setImagePreview(data.user.image || imagePreview);
      refreshSession?.();
    } catch (error) {
      console.error(error);
      setMessage("Unable to save profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async () => {
    setMessage("");
    if (!newPassword || !confirmPassword) {
      setMessage("Please fill in both password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage("New password and confirmation must match.");
      return;
    }
    if (newPassword.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("currentPassword", currentPassword);
      formData.append("password", newPassword);

      const res = await fetch("/api/profile", {
        method: "PATCH",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage(data.message || "Unable to update password");
        return;
      }

      setMessage("Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error(error);
      setMessage("Unable to update password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-8 grid gap-6 md:grid-cols-2">
      <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold">Personal Information</h2>

        <div className="space-y-5">
          <div>
            <Label>Name</Label>
            <Input
              className="mt-2"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your name"
            />
          </div>

          <div>
            <Label>Role</Label>
            <Select value={role} onValueChange={(value) => setRole(value)}>
              <SelectTrigger className="mt-2 w-full">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Software Development">
                  Software Development
                </SelectItem>
                <SelectItem value="Frontend Team">Frontend Team</SelectItem>
                <SelectItem value="Backend Team">Backend Team</SelectItem>
                <SelectItem value="QA / Testing">QA / Testing</SelectItem>
                <SelectItem value="DevOps">DevOps</SelectItem>
                <SelectItem value="Cyber Security">Cyber Security</SelectItem>
                <SelectItem value="Data Science">Data Science</SelectItem>
                <SelectItem value="Team Lead">Team Lead</SelectItem>
                <SelectItem value="Project Manager">Project Manager</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Bio</Label>
            <Textarea
              className="mt-2"
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              placeholder="Tell us a little about yourself"
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input className="mt-2" value={email} disabled />
          </div>

          <div>
            <Label>Phone</Label>
            <Input
              className="mt-2"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <Label>Location</Label>
            <Input
              className="mt-2"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="Enter your location"
            />
          </div>

          <Button className="mt-3" onClick={saveProfile} disabled={loading}>
            {loading ? "Saving..." : "Save Profile"}
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold">Update Password</h2>

        <div className="space-y-5">
          <div>
            <Label>Current Password</Label>
            <div className="relative mt-2">
              <Input
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(event) => setCurrentPassword(event.target.value)}
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

          <div>
            <Label>New Password</Label>
            <div className="relative mt-2">
              <Input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
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

          <div>
            <Label>Confirm Password</Label>
            <div className="relative mt-2">
              <Input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
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

          <Button onClick={updatePassword} disabled={loading}>
            {loading ? "Updating..." : "Update Password"}
          </Button>
        </div>
      </div>

      {message ? (
        <div className="rounded-2xl border border-border bg-background p-4 text-sm text-foreground">
          {message}
        </div>
      ) : null}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import ProfileSettings from "@/components/ProfileSettings";
import { useSession } from "next-auth/react";

type Profile = {
  name: string;
  email: string;
  image: string;
  role: string;
  location: string;
  phone: string;
  bio: string;
};

function Page() {
  const { data, update } = useSession();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await fetch("/api/profile", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
          setImagePreview(data.image || "");
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadProfile();
  }, []);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;
    if (!files?.length) {
      return;
    }
    const file = files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        setStatusMessage(data.message || "Unable to update profile image.");
        return;
      }
      setProfile(data.user);
      update?.();
      setStatusMessage("Profile image updated.");
    } catch (error) {
      console.error(error);
      setStatusMessage("Unable to update profile image.");
    }
  };

  return (
    <div className="min-h-screen w-full rounded-3xl border border-border bg-linear-to-br from-background to-background/50 p-4 sm:p-8 shadow-sm shadow-muted/20">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-primary">Profile</h1>

        <p className="mt-2 text-muted-foreground">Manage your profile</p>
      </div>

      {profile ? (
        <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
          <div className="rounded-3xl border border-border bg-background/80 p-6 shadow-sm shadow-muted/20">
            <div className="relative mx-auto mb-6 h-32 w-32 overflow-hidden rounded-full border-2 border-primary bg-muted">
              {imagePreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imagePreview}
                  className="h-full w-full object-cover"
                  alt="Profile Image"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-3xl text-muted-foreground">
                  {profile.email?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
            </div>

            <div className="space-y-4 text-sm text-muted-foreground">
              <label className="flex cursor-pointer items-center justify-center rounded-full border border-border bg-primary/10 px-4 py-2 text-center text-primary transition hover:bg-primary/20">
                <span>Change Image</span>
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleImageChange}
                />
              </label>
              {statusMessage ? (
                <p className="rounded-2xl border border-border bg-muted p-3 text-sm text-foreground">
                  {statusMessage}
                </p>
              ) : null}
            </div>

            <div className="mt-8 space-y-4">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                  Name
                </p>
                <p className="mt-2 text-base font-semibold text-foreground">
                  {profile.name}
                </p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                  Email
                </p>
                <p className="mt-2 text-base text-foreground">
                  {profile.email}
                </p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                  Role
                </p>
                <p className="mt-2 text-base text-foreground">
                  {profile.role || "Not set"}
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                    Phone
                  </p>
                  <p className="mt-2 text-base text-foreground">
                    {profile.phone || "Not set"}
                  </p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                    Location
                  </p>
                  <p className="mt-2 text-base text-foreground">
                    {profile.location || "Not set"}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                  Bio
                </p>
                <p className="mt-2 text-base text-foreground">
                  {profile.bio || "Add a short bio in the profile settings."}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-background/80 p-6 shadow-sm shadow-muted/20">
            <h2 className="mb-6 text-2xl font-semibold text-foreground">
              Account Settings
            </h2>
            <p className="mb-6 text-sm text-muted-foreground">
              Update your profile details and password below.
            </p>
            <ProfileSettings />
          </div>
        </div>
      ) : (
        <div className="text-primary text-2xl">Loading...</div>
      )}
    </div>
  );
}

export default Page;

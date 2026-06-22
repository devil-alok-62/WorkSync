"use client";

import ProfileSettings from "@/components/ProfileSettings";
import { useSession } from "next-auth/react";
import Image from "next/image";

function Page() {
  const { data } = useSession();

  return (
    <div className="min-h-screen w-full rounded-3xl border border-border bg-gradient-to-br from-background to-background/50 p-4 sm:p-8 shadow-sm shadow-muted/20">
      <div className="mb-10">
        <h1
          className="
text-4xl
font-bold
text-primary
"
        >
          Profile
        </h1>

        <p
          className="
mt-2
text-muted-foreground
"
        >
          Manage your profile{" "}
        </p>
      </div>

      {data ? (
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 rounded-3xl border border-border bg-background/50 p-6 sm:p-8 shadow-sm">
          {/* Profile Image Left Side */}
          {data.user.image && (
            <div className="relative h-28 w-28 sm:h-32 sm:w-32 shrink-0 overflow-hidden rounded-full border-2 border-primary">
              <Image
                src={data.user.image}
                fill
                className="object-cover"
                alt="Profile Image"
              />
            </div>
          )}

          {/* Name + Description Right Side */}
          <div className="flex flex-col text-center sm:text-left">
            {/* User Name Top */}
            <h1 className="text-3xl sm:text-4xl font-semibold">
              {data.user.name}
            </h1>

            {/* Paragraph Below Name */}
            <p className="mt-3 max-w-xl text-sm sm:text-base text-muted-foreground">
              Here's what's happening with your projects today. You can update
              your profile information, manage your account, and check your
              latest activities here.
            </p>
          </div>
        </div>
      ) : (
        <div className="text-primary text-2xl">Loading...</div>
      )}

      {/* update profile */}

      <ProfileSettings />
    </div>
  );
}

export default Page;

"use client";

import { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Trash2 } from "lucide-react";

import AddMemberDialog from "@/components/add-member-dialog";

type Member = {
  _id: string;

  name: string;

  email: string;

  role: string;

  status: string;
};

export default function TeamPage() {
  const [members, setMembers] = useState<Member[]>([]);

  const [search, setSearch] = useState("");

  const getMembers = async () => {
    const res = await fetch("/api/team", {
      cache: "no-store",
    });

    const data = await res.json();

    setMembers(data);
  };

  const deleteMember = async (id: string) => {
    console.log("Sending ID:", id);

    const res = await fetch(
      `/api/team/${id}`,

      {
        method: "DELETE",
      },
    );

    const data = await res.json();

    console.log(data);

    if (res.ok) {
      getMembers();
    }
  };
  useEffect(() => {
    getMembers();
  }, []);

  const filter = members.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Team Members</h1>

          <p className="text-muted-foreground">Manage your project team</p>
        </div>

        <AddMemberDialog refresh={getMembers} />
      </div>

      <Input
        placeholder="Search members..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md"
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filter.map((member) => (
          <Card
            key={member._id}
            className="bg-white/10 dark:bg-black/30 backdrop-blur-xl border-white/20 hover:scale-[1.02] transition"
          >
            <CardContent className="p-6 space-y-5">
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14">
                  <AvatarImage />

                  <AvatarFallback className=" text-pretty text-xl">
                    {member.name[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h2 className="font-semibold">{member.name}</h2>

                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              </div>
              <p className="text-sm">{member.email}</p>
              <div className="flex items-center justify-between">
                <Badge>{member.status}</Badge>
                <Button
                  variant="destructive"
                  onClick={() => deleteMember(member._id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Bell, Lock, Eye, Palette, LogOut, Trash2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { signOut } from "next-auth/react";

type SettingKey = keyof typeof defaultSettings;

const defaultSettings = {
  emailNotifications: true,
  pushNotifications: false,
  weeklyDigest: true,
  marketingEmails: false,
  privateProfile: false,
  twoFactorAuth: false,
  sessionTimeout: "30",
};

type SettingsItem =
  | { label: string; description: string; control: "theme" }
  | { label: string; description: string; key: SettingKey }
  | {
      label: string;
      description: string;
      control: "select";
      options: { value: string; label: string }[];
    };

type SettingsSection = {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  items: SettingsItem[];
};

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState(defaultSettings);

  const handleToggle = (key: SettingKey) => {
    setSettings((prev) => ({
      ...prev,
      [key]: typeof prev[key] === "boolean" ? !prev[key] : prev[key],
    }));
    setSaved(false);
  };

  const handleSessionChange = (value: string) => {
    setSettings((prev) => ({ ...prev, sessionTimeout: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  const settingsSections: SettingsSection[] = [
    {
      title: "Appearance",
      icon: Palette,
      items: [
        {
          label: "Theme",
          description: "Switch between light and dark mode",
          control: "theme",
        },
      ],
    },
    {
      title: "Notifications",
      icon: Bell,
      items: [
        {
          label: "Email Notifications",
          description: "Receive notifications via email",
          key: "emailNotifications",
        },
        {
          label: "Push Notifications",
          description: "Get real-time push notifications",
          key: "pushNotifications",
        },
        {
          label: "Weekly Digest",
          description: "Receive a summary every week",
          key: "weeklyDigest",
        },
        {
          label: "Marketing Emails",
          description: "Get updates about new features",
          key: "marketingEmails",
        },
      ],
    },
    {
      title: "Privacy & Security",
      icon: Lock,
      items: [
        {
          label: "Private Profile",
          description: "Make your profile visible only to you",
          key: "privateProfile",
        },
        {
          label: "Two-Factor Authentication",
          description: "Add extra security to your account",
          key: "twoFactorAuth",
        },
      ],
    },
    {
      title: "Session Management",
      icon: Eye,
      items: [
        {
          label: "Session Timeout",
          description: "Auto logout after inactivity (minutes)",
          control: "select",
          options: [
            { value: "15", label: "15 minutes" },
            { value: "30", label: "30 minutes" },
            { value: "60", label: "1 hour" },
            { value: "120", label: "2 hours" },
          ],
        },
      ],
    },
  ];

  const renderControl = (item: SettingsItem) => {
    if ("control" in item) {
      if (item.control === "theme") {
        return <ThemeToggle />;
      }
      if (item.control === "select") {
        return (
          <select
            value={settings.sessionTimeout}
            onChange={(e) => handleSessionChange(e.target.value)}
            className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-ring focus:ring-1"
          >
            {item.options.map((opt: { value: string; label: string }) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );
      }
    }
    if ("key" in item) {
      const key = item.key;
      const isEnabled = settings[key];
      return (
        <button
          onClick={() => handleToggle(key)}
          className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
            isEnabled ? "bg-blue-500" : "bg-muted"
          }`}
        >
          <span
            className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
              isEnabled ? "translate-x-7" : "translate-x-1"
            }`}
          />
        </button>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground">Settings</h1>
        <p className="mt-2 text-muted-foreground">
          Manage your account preferences and security settings.
        </p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {settingsSections.map((section) => {
          const Icon = section.icon;
          return (
            <div
              key={section.title}
              className="rounded-2xl border border-border bg-background p-6 shadow-sm shadow-muted/20"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-lg bg-muted p-2">
                  <Icon className="h-5 w-5 text-foreground" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">
                  {section.title}
                </h2>
              </div>

              <div className="space-y-4">
                {section.items.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between rounded-xl border border-border/50 bg-muted/30 p-4"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">
                        {item.label}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    {renderControl(item)}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Save and Danger Zone */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Save Button */}
        <div className="lg:col-span-1">
          <Button
            onClick={handleSave}
            className="w-full gap-2"
            disabled={saved}
          >
            {saved ? (
              <>
                <Check className="h-4 w-4" />
                Saved
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>

        {/* Danger Zone */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-destructive/50 bg-destructive/10 p-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-destructive">
              <Trash2 className="h-5 w-5" />
              Danger Zone
            </h2>
            <p className="mb-4 text-sm text-destructive/80">
              These actions cannot be undone. Please proceed with caution.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleLogout}
                className="flex-1 border-destructive/50 text-destructive hover:bg-destructive/10"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-destructive/50 text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

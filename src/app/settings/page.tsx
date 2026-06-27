"use client";

import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { useCrm } from "@/context/CrmContext";
import { SettingsForm } from "./SettingsForm";

export default function SettingsPage() {
  const { profile, updateProfile, hydrated } = useCrm();

  return (
    <AppShell title="Settings" description="Manage your profile">
      <PageHeader
        title="Settings"
        description="Update your profile information"
      />

      {!hydrated ? (
        <div className="flex h-64 items-center justify-center text-slate-400">
          Loading...
        </div>
      ) : (
        <div className="mx-auto max-w-lg">
          <SettingsForm profile={profile} onSave={updateProfile} />
        </div>
      )}
    </AppShell>
  );
}

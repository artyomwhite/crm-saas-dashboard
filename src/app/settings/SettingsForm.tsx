"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import type { UserProfile } from "@/lib/types";

interface SettingsFormProps {
  profile: UserProfile;
  onSave: (data: UserProfile) => void;
}

export function SettingsForm({ profile, onSave }: SettingsFormProps) {
  const [form, setForm] = useState(profile);
  const [saved, setSaved] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSave(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <>
      <Card>
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-2xl font-bold text-indigo-700">
            {form.name.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-slate-900">{form.name}</p>
            <p className="text-sm text-slate-500">{form.role}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <Input
            label="Company"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
          />
          <Input
            label="Role"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          />
          <div className="flex items-center gap-3 pt-2">
            <Button type="submit">Save Profile</Button>
            {saved && (
              <span className="text-sm text-emerald-600">Saved successfully</span>
            )}
          </div>
        </form>
      </Card>

      <Card className="mt-6">
        <h3 className="text-sm font-semibold text-slate-900">About this app</h3>
        <p className="mt-2 text-sm text-slate-500">
          CRM SaaS Dashboard MVP — mock data with localStorage persistence. No
          backend required. Deploy-ready for Vercel.
        </p>
      </Card>
    </>
  );
}

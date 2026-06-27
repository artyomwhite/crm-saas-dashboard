"use client";

import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useCrm } from "@/context/CrmContext";

const statIcons = {
  clients: (
    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    </div>
  ),
  deals: (
    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25m-17.25 0h17.25m-17.25 0v.375c0 .621.504 1.125 1.125 1.125M3.75 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    </div>
  ),
  tasks: (
    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
  ),
};

const activityColors = {
  client: "bg-indigo-500",
  deal: "bg-emerald-500",
  task: "bg-amber-500",
};

export default function DashboardPage() {
  const { stats, activities, hydrated } = useCrm();

  const statCards = [
    { label: "Total Clients", value: stats.totalClients, icon: statIcons.clients },
    { label: "Active Deals", value: stats.activeDeals, icon: statIcons.deals },
    { label: "Open Tasks", value: stats.openTasks, icon: statIcons.tasks },
  ];

  return (
    <AppShell
      title="Dashboard"
      description="Overview of your CRM activity"
    >
      {!hydrated ? (
        <div className="flex h-64 items-center justify-center text-slate-400">
          Loading...
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {statCards.map((stat) => (
              <Card key={stat.label} hover className="flex items-center gap-4">
                {stat.icon}
                <div>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                  <p className="text-3xl font-bold text-slate-900">
                    {stat.value}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          <Card>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-900">
                Recent Activity
              </h2>
              <Badge variant="info">Live</Badge>
            </div>
            <ul className="divide-y divide-slate-100">
              {activities.slice(0, 8).map((activity) => (
                <li
                  key={activity.id}
                  className="flex items-start gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <span
                    className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${activityColors[activity.type]}`}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-slate-700">{activity.message}</p>
                    <p className="mt-0.5 text-xs text-slate-400">
                      {activity.time}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      )}
    </AppShell>
  );
}

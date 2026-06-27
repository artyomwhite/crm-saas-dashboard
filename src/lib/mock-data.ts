import type { CrmState } from "./types";

export const initialCrmState: CrmState = {
  clients: [
    {
      id: "1",
      name: "Acme Corp",
      email: "contact@acme.com",
      status: "active",
      createdAt: "2026-06-01",
    },
    {
      id: "2",
      name: "Globex Inc",
      email: "hello@globex.io",
      status: "lead",
      createdAt: "2026-06-10",
    },
    {
      id: "3",
      name: "Initech",
      email: "sales@initech.com",
      status: "active",
      createdAt: "2026-06-15",
    },
    {
      id: "4",
      name: "Umbrella LLC",
      email: "info@umbrella.co",
      status: "inactive",
      createdAt: "2026-05-20",
    },
    {
      id: "5",
      name: "Stark Industries",
      email: "biz@stark.com",
      status: "active",
      createdAt: "2026-06-22",
    },
  ],
  deals: [
    {
      id: "1",
      title: "Enterprise License",
      clientName: "Acme Corp",
      value: 48000,
      stage: "negotiation",
    },
    {
      id: "2",
      title: "Starter Plan",
      clientName: "Globex Inc",
      value: 12000,
      stage: "lead",
    },
    {
      id: "3",
      title: "Annual Support",
      clientName: "Initech",
      value: 8500,
      stage: "won",
    },
    {
      id: "4",
      title: "Pilot Program",
      clientName: "Umbrella LLC",
      value: 5000,
      stage: "lost",
    },
    {
      id: "5",
      title: "Platform Upgrade",
      clientName: "Stark Industries",
      value: 32000,
      stage: "lead",
    },
    {
      id: "6",
      title: "Team Seats",
      clientName: "Acme Corp",
      value: 9600,
      stage: "negotiation",
    },
  ],
  tasks: [
    {
      id: "1",
      title: "Follow up with Acme Corp",
      done: false,
      createdAt: "2026-06-26",
    },
    {
      id: "2",
      title: "Send proposal to Globex",
      done: false,
      createdAt: "2026-06-25",
    },
    {
      id: "3",
      title: "Schedule demo with Initech",
      done: true,
      createdAt: "2026-06-24",
    },
    {
      id: "4",
      title: "Review Q2 pipeline",
      done: false,
      createdAt: "2026-06-23",
    },
  ],
  activities: [
    {
      id: "1",
      message: "New client Stark Industries added",
      time: "2 hours ago",
      type: "client",
    },
    {
      id: "2",
      message: "Deal 'Annual Support' moved to Won",
      time: "5 hours ago",
      type: "deal",
    },
    {
      id: "3",
      message: "Task 'Schedule demo' completed",
      time: "Yesterday",
      type: "task",
    },
    {
      id: "4",
      message: "Deal 'Enterprise License' entered Negotiation",
      time: "Yesterday",
      type: "deal",
    },
    {
      id: "5",
      message: "Client Globex Inc status updated to Lead",
      time: "2 days ago",
      type: "client",
    },
  ],
  profile: {
    name: "Alex Morgan",
    email: "alex@crmsaas.io",
    company: "CRM SaaS Dashboard",
    role: "Sales Manager",
  },
};

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { initialCrmState } from "@/lib/mock-data";
import { loadCrmState, saveCrmState } from "@/lib/storage";
import type {
  Activity,
  Client,
  ClientStatus,
  CrmState,
  Deal,
  DealStage,
  Task,
  UserProfile,
} from "@/lib/types";

function uid() {
  return crypto.randomUUID();
}

interface CrmContextValue extends CrmState {
  hydrated: boolean;
  addClient: (data: Omit<Client, "id" | "createdAt">) => void;
  updateClient: (id: string, data: Partial<Omit<Client, "id">>) => void;
  deleteClient: (id: string) => void;
  addDeal: (data: Omit<Deal, "id">) => void;
  moveDeal: (id: string, stage: DealStage) => void;
  deleteDeal: (id: string) => void;
  addTask: (title: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  stats: {
    totalClients: number;
    activeDeals: number;
    openTasks: number;
  };
}

const CrmContext = createContext<CrmContextValue | null>(null);

export function CrmProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CrmState>(initialCrmState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = loadCrmState();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time localStorage hydration
    setState(stored);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveCrmState(state);
  }, [state, hydrated]);

  const addActivity = useCallback((activity: Omit<Activity, "id">) => {
    setState((prev) => ({
      ...prev,
      activities: [{ id: uid(), ...activity }, ...prev.activities].slice(
        0,
        20,
      ),
    }));
  }, []);

  const addClient = useCallback(
    (data: Omit<Client, "id" | "createdAt">) => {
      const client: Client = {
        ...data,
        id: uid(),
        createdAt: new Date().toISOString().slice(0, 10),
      };
      setState((prev) => ({ ...prev, clients: [...prev.clients, client] }));
      addActivity({
        message: `New client ${client.name} added`,
        time: "Just now",
        type: "client",
      });
    },
    [addActivity],
  );

  const updateClient = useCallback(
    (id: string, data: Partial<Omit<Client, "id">>) => {
      setState((prev) => ({
        ...prev,
        clients: prev.clients.map((c) =>
          c.id === id ? { ...c, ...data } : c,
        ),
      }));
      if (data.status) {
        const client = state.clients.find((c) => c.id === id);
        if (client) {
          addActivity({
            message: `Client ${client.name} status updated to ${data.status}`,
            time: "Just now",
            type: "client",
          });
        }
      }
    },
    [addActivity, state.clients],
  );

  const deleteClient = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      clients: prev.clients.filter((c) => c.id !== id),
    }));
  }, []);

  const addDeal = useCallback(
    (data: Omit<Deal, "id">) => {
      const deal: Deal = { ...data, id: uid() };
      setState((prev) => ({ ...prev, deals: [...prev.deals, deal] }));
      addActivity({
        message: `New deal '${deal.title}' created`,
        time: "Just now",
        type: "deal",
      });
    },
    [addActivity],
  );

  const moveDeal = useCallback(
    (id: string, stage: DealStage) => {
      setState((prev) => {
        const deal = prev.deals.find((d) => d.id === id);
        if (!deal || deal.stage === stage) return prev;
        return {
          ...prev,
          deals: prev.deals.map((d) => (d.id === id ? { ...d, stage } : d)),
        };
      });
      const deal = state.deals.find((d) => d.id === id);
      if (deal && deal.stage !== stage) {
        addActivity({
          message: `Deal '${deal.title}' moved to ${stage.charAt(0).toUpperCase() + stage.slice(1)}`,
          time: "Just now",
          type: "deal",
        });
      }
    },
    [addActivity, state.deals],
  );

  const deleteDeal = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      deals: prev.deals.filter((d) => d.id !== id),
    }));
  }, []);

  const addTask = useCallback(
    (title: string) => {
      const task: Task = {
        id: uid(),
        title,
        done: false,
        createdAt: new Date().toISOString().slice(0, 10),
      };
      setState((prev) => ({ ...prev, tasks: [task, ...prev.tasks] }));
      addActivity({
        message: `Task '${title}' created`,
        time: "Just now",
        type: "task",
      });
    },
    [addActivity],
  );

  const toggleTask = useCallback(
    (id: string) => {
      const task = state.tasks.find((t) => t.id === id);
      if (!task) return;
      const done = !task.done;
      setState((prev) => ({
        ...prev,
        tasks: prev.tasks.map((t) => (t.id === id ? { ...t, done } : t)),
      }));
      if (done) {
        addActivity({
          message: `Task '${task.title}' completed`,
          time: "Just now",
          type: "task",
        });
      }
    },
    [addActivity, state.tasks],
  );

  const deleteTask = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      tasks: prev.tasks.filter((t) => t.id !== id),
    }));
  }, []);

  const updateProfile = useCallback((data: Partial<UserProfile>) => {
    setState((prev) => ({
      ...prev,
      profile: { ...prev.profile, ...data },
    }));
  }, []);

  const stats = useMemo(
    () => ({
      totalClients: state.clients.length,
      activeDeals: state.deals.filter(
        (d) => d.stage === "lead" || d.stage === "negotiation",
      ).length,
      openTasks: state.tasks.filter((t) => !t.done).length,
    }),
    [state.clients, state.deals, state.tasks],
  );

  const value = useMemo(
    () => ({
      ...state,
      hydrated,
      addClient,
      updateClient,
      deleteClient,
      addDeal,
      moveDeal,
      deleteDeal,
      addTask,
      toggleTask,
      deleteTask,
      updateProfile,
      stats,
    }),
    [
      state,
      hydrated,
      addClient,
      updateClient,
      deleteClient,
      addDeal,
      moveDeal,
      deleteDeal,
      addTask,
      toggleTask,
      deleteTask,
      updateProfile,
      stats,
    ],
  );

  return <CrmContext.Provider value={value}>{children}</CrmContext.Provider>;
}

export function useCrm() {
  const ctx = useContext(CrmContext);
  if (!ctx) throw new Error("useCrm must be used within CrmProvider");
  return ctx;
}

export const CLIENT_STATUSES: ClientStatus[] = ["active", "inactive", "lead"];
export const DEAL_STAGES: DealStage[] = [
  "lead",
  "negotiation",
  "won",
  "lost",
];

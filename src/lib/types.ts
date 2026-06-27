export type ClientStatus = "active" | "inactive" | "lead";

export interface Client {
  id: string;
  name: string;
  email: string;
  status: ClientStatus;
  createdAt: string;
}

export type DealStage = "lead" | "negotiation" | "won" | "lost";

export interface Deal {
  id: string;
  title: string;
  clientName: string;
  value: number;
  stage: DealStage;
}

export interface Task {
  id: string;
  title: string;
  done: boolean;
  createdAt: string;
}

export interface Activity {
  id: string;
  message: string;
  time: string;
  type: "client" | "deal" | "task";
}

export interface UserProfile {
  name: string;
  email: string;
  company: string;
  role: string;
}

export interface CrmState {
  clients: Client[];
  deals: Deal[];
  tasks: Task[];
  activities: Activity[];
  profile: UserProfile;
}

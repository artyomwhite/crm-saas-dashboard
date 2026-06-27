import { initialCrmState } from "./mock-data";
import type { CrmState } from "./types";

const STORAGE_KEY = "crm-saas-dashboard";

export function loadCrmState(): CrmState {
  if (typeof window === "undefined") return initialCrmState;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialCrmState;
    return { ...initialCrmState, ...JSON.parse(raw) } as CrmState;
  } catch {
    return initialCrmState;
  }
}

export function saveCrmState(state: CrmState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore quota errors
  }
}

import { useSyncExternalStore } from "react";

export type ProgressState = {
  started: boolean;
  visited: string[];
  dojo: boolean;
  langSwitched: boolean;
  secret: boolean;
  muted: boolean;
};

const KEY = "ao_progress_v1";

const defaults: ProgressState = {
  started: false,
  visited: [],
  dojo: false,
  langSwitched: false,
  secret: false,
  muted: true,
};

let state: ProgressState = defaults;
let hydrated = false;
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function persist() {
  try {
    if (typeof window !== "undefined") {
      localStorage.setItem(KEY, JSON.stringify(state));
    }
  } catch {
    /* storage may be unavailable */
  }
}

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      state = { ...defaults, ...(JSON.parse(raw) as Partial<ProgressState>) };
      emit();
    }
  } catch {
    /* ignore */
  }
}

function set(patch: Partial<ProgressState>) {
  state = { ...state, ...patch };
  persist();
  emit();
}

function subscribe(listener: () => void) {
  hydrate();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export const progress = {
  start() {
    if (!state.started) set({ started: true });
  },
  visit(id: string) {
    if (!state.visited.includes(id)) set({ visited: [...state.visited, id] });
  },
  reachDojo() {
    if (!state.dojo) set({ dojo: true });
  },
  switchLang() {
    if (!state.langSwitched) set({ langSwitched: true });
  },
  unlockSecret() {
    if (!state.secret) set({ secret: true });
  },
  setMuted(muted: boolean) {
    if (state.muted !== muted) set({ muted });
  },
  toggleMuted() {
    set({ muted: !state.muted });
  },
};

export function getProgress(): ProgressState {
  return state;
}

function getSnapshot() {
  return state;
}

function getServerSnapshot() {
  return defaults;
}

export function useProgress(): ProgressState {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

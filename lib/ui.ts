import { useSyncExternalStore } from "react";

type UIState = {
  arcade: boolean;
  project: string | null;
  achievements: boolean;
};

let state: UIState = { arcade: false, project: null, achievements: false };
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

function set(patch: Partial<UIState>) {
  state = { ...state, ...patch };
  emit();
}

export const ui = {
  openArcade: () => set({ arcade: true }),
  closeArcade: () => set({ arcade: false }),
  openProject: (id: string) => set({ project: id }),
  closeProject: () => set({ project: null }),
  toggleAchievements: () => set({ achievements: !state.achievements }),
  closeAchievements: () => set({ achievements: false }),
};

export function useUI(): UIState {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => state,
    () => state,
  );
}

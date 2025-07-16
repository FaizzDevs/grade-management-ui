// progressStore.ts
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface ProgressState {
  progressMap: Record<string, number>
  setProgress: (classId: string, value: number) => void
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      progressMap: {},
      setProgress: (classId, value) =>
        set((state) => ({
          progressMap: {
            ...state.progressMap,
            [classId]: value,
          },
        })),
    }),
    {
      name: "progress-storage", // key di localStorage
    }
  )
)

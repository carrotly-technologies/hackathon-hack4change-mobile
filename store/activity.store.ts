import {create} from 'zustand'
import {ActivityActionsProps, ActivityState} from "@/utils/types";

export const useActivityStore = create<ActivityState & ActivityActionsProps>((set) => ({
    isStarted: false,
    isPlaying: false,
    elapsedTime: 0,
    setStarted: (value: boolean) => set({isStarted: value}),
    setPlaying: (value: boolean) => set({isPlaying: value}),
    setElapsedTime: (value: number) => set({elapsedTime: value}),
    incrementElapsedTime: () => set((state) => ({elapsedTime: state.elapsedTime + 1}))
}));

import {create} from 'zustand'
import {ActivityActionsProps, ActivityState} from "@/utils/types";

export const useActivityStore = create<ActivityState & ActivityActionsProps>((set) => ({
    isStarted: false,
    isPlaying: false,
    setStarted: (value: boolean) => set({isStarted: value}),
    setPlaying: (value: boolean) => set({isPlaying: value})
}));

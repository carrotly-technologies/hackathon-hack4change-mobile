import {create} from 'zustand'
import {ActivityActionsProps, ActivityState} from "@/utils/types";

export const useActivityStore = create<ActivityState & ActivityActionsProps>((set) => ({
    isStarted: false,
    isPlaying: false,
    isPaused: false,
    elapsedTime: 0,
    currentLocation: null,
    locations: [],
    distance: 0,

    setStarted: (value: boolean) => set({isStarted: value}),
    setPlaying: (value: boolean) => set({isPlaying: value}),
    setPaused: (value: boolean) => set({isPaused: value}),
    setElapsedTime: (value: number) => set({elapsedTime: value}),
    incrementElapsedTime: () => set((state) => ({elapsedTime: state.elapsedTime + 1})),

    setCurrentLocation: (location) => set({currentLocation: location}),
    addLocation: (location) => set((state) => ({
        locations: [...state.locations, location]
    })),
    setDistance: (value: number) => set({distance: value}),
    incrementDistance: (additionalDistance: number) => set((state) => ({
        distance: state.distance + additionalDistance
    })),
    resetLocations: () => set({currentLocation: null, locations: [], distance: 0})
}));

export type MemoFeed = {
    id: string;
    avatar: string;
    name: string;
    length: number;
    points: number;
    achievements: string;
}

export type MemoFeedProps = {
    feed: MemoFeed[];
}


export type LocationCoords = {
    latitude: number;
    longitude: number;
    timestamp: number;
}

export type ActivityState = {
    isStarted: boolean;
    isPlaying: boolean;
    isPaused: boolean;
    elapsedTime: number; // Time in seconds
    currentLocation: LocationCoords | null;
    locations: LocationCoords[];
    distance: number; // Distance in meters
    trashCount: number; // Number of trash items collected
    trashLocations: LocationCoords[]; // Locations where trash was collected
}

export type ActivityActionsProps = {
    setStarted: (isStarted: boolean) => void;
    setPlaying: (isPlaying: boolean) => void;
    setPaused: (isPaused: boolean) => void;
    setElapsedTime: (elapsedTime: number) => void;
    incrementElapsedTime: () => void;
    setCurrentLocation: (location: LocationCoords) => void;
    addLocation: (location: LocationCoords) => void;
    setDistance: (distance: number) => void;
    incrementDistance: (additionalDistance: number) => void;
    resetLocations: () => void;
    incrementTrashCount: () => void;
    setTrashCount: (count: number) => void;
    resetTrashCount: () => void;
    addTrashLocation: (location: LocationCoords) => void;
    resetTrashLocations: () => void;
}

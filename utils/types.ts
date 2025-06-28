import {ReactElement} from "react";
import {ActivityType} from "@/api/__generated__/graphql";

export type MemoFeed = {
    id: string;
    avatar: string;
    name: string;
    length: number;
    points: number;
    achievements: string;
    details: string;
    images: string[]
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
    elapsedTime: number;
    currentLocation: LocationCoords | null;
    locations: LocationCoords[];
    distance: number;
    trashCount: number;
    trashLocations: LocationCoords[];
    user: SimpleUser | null;
    type: ActivityType | null,
    activityId: string | null;
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
    setUser: (user: SimpleUser) => void;
    setActivityType: (type: ActivityType) => void;
    setActivityId: (id: string) => void;
    resetActivity: () => void;
}

export type SimpleUser = {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    avatarUrl: string;
}

export interface TabScreen {
    name: string;
    title: string;
    icon?: (props: IconProps) => ReactElement;
    headerShow?: boolean;
}


export interface IconProps {
    fill?: string;
    color?: string;
    size?: number;
    alternative?: string;
}

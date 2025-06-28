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


export type ActivityState = {
    isStarted: boolean;
    isPlaying: boolean;
    elapsedTime: number; // Time in seconds
}

export type ActivityActionsProps = {
    setStarted: (isStarted: boolean) => void;
    setPlaying: (isPlaying: boolean) => void;
    setElapsedTime: (elapsedTime: number) => void;
    incrementElapsedTime: () => void;
}

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
}

export type ActivityActionsProps = {
    setStarted: (isStarted: boolean) => void;
    setPlaying: (isPlaying: boolean) => void;
}
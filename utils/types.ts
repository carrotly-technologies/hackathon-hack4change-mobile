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
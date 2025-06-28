import {MemoFeed, MemoFeedProps} from "@/utils/types";

export const memoFeedData: MemoFeed[] = [
    {
        id: "1",
        avatar: "https://example.com/avatar1.png",
        name: "John Doe",
        length: 5,
        points: 100,
        achievements: "First Milestone",
        details: "Dziś, 9:13 | Park Zdrojowy Brzeno"
    },
    {
        id: "2",
        avatar: "https://example.com/avatar2.png",
        name: "Jane Smith",
        length: 7,
        points: 150,
        achievements: "Top Scorer",
        details: "Dziś, 9:13 | Park Zdrojowy Brzeno"
    },
    {
        id: "3",
        avatar: "https://example.com/avatar3.png",
        name: "Mike Johnson",
        length: 3,
        points: 80,
        achievements: "Quick Learner",
        details: "Dziś, 9:13 | Park Zdrojowy Brzeno"
    }
];


export const memoFeedProps: MemoFeedProps = {
    feed: memoFeedData,
}
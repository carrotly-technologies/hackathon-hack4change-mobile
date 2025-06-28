import {useEffect} from "react";
import {router} from "expo-router";
import {useUserQuery} from "@/api/__generated__/graphql";
import {useActivityStore} from "@/store/activity.store";

const Index = () => {
    const {data} = useUserQuery()
    const {setUser} = useActivityStore()

    useEffect(() => {
        if (data?.user) {
            setUser({
                email: data.user.email,
                id: data.user.id,
                firstname: data.user.firstname,
                lastname: data.user.lastname,
                avatarUrl: data.user.avatarUrl ?? "https://picsum.photos/64/64",
                coins: data?.user.coin,
                challengesProgress: data?.user.challengeProgress.map(ch => ({
                    ...ch
                }))
            })

            router.replace('/home')
        }
    }, [data]);

    return <></>
}

export default Index;
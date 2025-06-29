import {useUserQuery} from "@/api/__generated__/graphql";
import {useActivityStore} from "@/store/activity.store";
import {router} from "expo-router";
import {useEffect} from "react";

const Index = () => {
  const {data, error, loading} = useUserQuery()
  const { setUser } = useActivityStore()

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
import { useActivityStartedQuery } from "@/api/__generated__/graphql";
import { useActivityStore } from "@/store/activity.store";
import { router, usePathname } from "expo-router";
import { PropsWithChildren, useEffect, useState } from "react";

export const ActivityStartedGuard = ({ children }: PropsWithChildren<{}>) => {
  const pathname = usePathname()
  const [blacklist, setBlacklist] = useState<string[]>([])

  const { data } = useActivityStartedQuery({
    variables: {
      userId: "685fc7347afcbf34e1fd67a6",
    },
    pollInterval: 1000,
  })

  const { isPlaying, setActivityId, resetActivity } = useActivityStore();

  useEffect(() => {
    const activityId = data?.activityStarted?.id;

    if (activityId && !blacklist.includes(activityId)) {
      if (pathname !== '/activity' && pathname !== '/activity/finish') {
        setBlacklist(v => [...v, activityId]);
        setActivityId(activityId);

        router.replace(`/activity`);
      }
    }

    if (!activityId && isPlaying) {
      resetActivity();

      router.replace('/home/activity');
    }
  }, [data, pathname, blacklist]);

  return (
    <>
      {children}
    </>
  )
}
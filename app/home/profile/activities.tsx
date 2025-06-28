import {ScrollView, View} from "react-native";
import {useActivitiesQuery} from "@/api/__generated__/graphql";
import MemoFeed from "@/components/screens/common/MemoFeed";
import React from "react";

const ProfileActivities = () => {
    const {data, loading, error} = useActivitiesQuery({
        variables: {
            input: {},
            sort: {},
            pagination: {}
        }
    })

    return <ScrollView>
        {data && <MemoFeed feed={data?.activities.data.map(dta => ({
            id: dta.id,
            name: dta.name ?? "",
            details: String(dta.durationTime),
            avatar: dta.user?.avatarUrl ?? "",
            length: dta.distance,
            points: dta.points,
            achievements: "Milestone",
            images: dta.imageUrls
        }))}/>}

        <View style={{height: 120}}/>
    </ScrollView>
};

export default ProfileActivities;
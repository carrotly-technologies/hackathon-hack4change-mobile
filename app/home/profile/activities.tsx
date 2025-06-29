import {ScrollView, View} from "react-native";
import {Sort, useActivitiesQuery} from "@/api/__generated__/graphql";
import MemoFeed from "@/components/screens/common/MemoFeed";
import React from "react";
import * as Progress from 'react-native-progress';

const ProfileActivities = () => {
    const {data, loading, error} = useActivitiesQuery({
        variables: {
            input: {},
            sort: {
                createdAt: {
                    direction: Sort.Asc
                }
            },
            pagination: {
                pageSize: 100
            }
        }
    })

    if (loading) {
        return <Progress.Circle/>
    }

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
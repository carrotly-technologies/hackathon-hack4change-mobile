import CustomBottomTab from "@/components/bottom-tab/CustomBottomTab";
import { ActionsIcon } from "@/components/svg/ActionsIcon";
import { HomeIcon } from "@/components/svg/HomeIcon";
import { PlayIcon } from "@/components/svg/PlayIcon";
import { ProfileIcon } from "@/components/svg/ProfileIcon";
import { RankingIcon } from "@/components/svg/RankingIcon";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { TabScreen } from "@/utils/types";
import { router, Tabs } from 'expo-router';
import React from "react";
import { TouchableOpacity } from "react-native";

const TabScreens: TabScreen[] = [
    {
        name: "index",
        title: "Home",
        icon: (props) => <HomeIcon color={props.color} width={24} height={24} />
    },
    {
        name: "rank",
        title: "Ranking",
        icon: (props) => <RankingIcon color={props.color} width={24} height={24} />
    },
    {
        name: "activity",
        title: "Rozpocznij",
        icon: (props) => {
            if (props.alternative) {
                return (
                    <TouchableOpacity onPress={() => router.replace("/activity")}>
                        <PlayIcon color={props.color} width={24} height={24} />
                    </TouchableOpacity>
                )
            }

            return <PlayIcon color={props.color} width={24} height={24} />;
        }
    },
    {
        name: "events",
        title: "Akcje",
        icon: (props) => <ActionsIcon color={props.color} width={24} height={24} />
    },
    {
        name: "profile",
        title: "Profil",
        icon: (props) => <ProfileIcon color={props.color} width={24} height={24} />
    },
]

const RootLayout = () => {

    return (
        <Tabs
            tabBar={props => {
                return <CustomBottomTab {...props} allItems={TabScreens} />
            }}
            screenOptions={{
                headerShown: false,
                tabBarBackground: TabBarBackground,
            }}>
            {TabScreens.map((tab: TabScreen) => <Tabs.Screen key={tab.name} name={tab.name}
                options={{
                    title: tab.title,
                    headerShown: false
                }} />)}
        </Tabs>
    );
}

export default RootLayout;
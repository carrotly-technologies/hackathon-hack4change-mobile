import CustomBottomTab from "@/components/bottom-tab/CustomBottomTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { TabScreen } from "@/utils/types";
import { Octicons } from "@expo/vector-icons";
import { router, Tabs } from 'expo-router';
import React from "react";
import { TouchableOpacity } from "react-native";

const TabScreens: TabScreen[] = [
    {
        name: "index",
        title: "Home",
        icon: (props) => <Octicons name="home" size={24} color={props.color} />
    },
    {
        name: "rank",
        title: "Ranking",
        icon: (props) => <Octicons name="search" size={24} color={props.color} />
    },
    {
        name: "activity",
        title: "Rozpocznij",
        icon: (props) => {
            if (props.alternative) {
                return <TouchableOpacity onPress={() => {
                    router.replace("/activity")
                }}>
                    <Octicons name={"play"} size={24} color={props.color} />
                </TouchableOpacity>;
            }
            return <Octicons name={"plus-circle"} size={24} color={props.color} />;
        }
    },
    {
        name: "events",
        title: "Eventy",
        icon: (props) => <Octicons name="bell" size={24} color={props.color} />
    },
    {
        name: "profile",
        title: "Profil",
        icon: (props) => <Octicons name="person" size={24} color={props.color} />,
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
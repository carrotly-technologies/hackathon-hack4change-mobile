import {router, Tabs, usePathname} from 'expo-router';
import {HapticTab} from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import {TouchableOpacity} from "react-native";
import React from "react";
import {Ionicons, Octicons} from "@expo/vector-icons";


const RootLayout = () => {

    const path = usePathname();


    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: () => <Octicons name="home" size={24} color="black"/>,
                }}
            />
            <Tabs.Screen
                name="rank"
                options={{
                    title: 'Ranking',
                    tabBarIcon: () => <Octicons name="search" size={24} color="black"/>,
                }}
            />
            <Tabs.Screen
                name="activity"
                options={{
                    title: 'Rozpocznij',
                    tabBarIcon: () => {
                        if (path === "/home/activity") {
                            return <TouchableOpacity
                                onPress={() => router.replace("/activity")}
                                style={{justifyContent: "center", width: 60, height: 80}}
                            >
                                <Ionicons name={"play"} size={60}
                                          style={{position: "absolute", top: -10}}
                                          color="black"/>
                            </TouchableOpacity>;
                        }
                        return <Octicons name="plus-circle" size={24} color="black"/>;
                    },
                }}
            />
            <Tabs.Screen
                name="events"
                options={{
                    title: 'Wydarzenia',
                    tabBarIcon: () => <Octicons name="bell" size={24} color="black"/>,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profil',
                    tabBarIcon: () => <Octicons name="person" size={24} color="black"/>,
                }}
            />
        </Tabs>
    );
}

export default RootLayout;
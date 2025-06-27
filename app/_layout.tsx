import {DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Tabs, usePathname} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import {HapticTab} from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import {Platform, TouchableOpacity} from "react-native";
import React from "react";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import {Octicons} from "@expo/vector-icons";

const client = new ApolloClient({
    uri: "",
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'all',
        },
        query: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'all',
        },
    }
});

const RootLayout = () => {
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    const path = usePathname();

    if (!loaded) {
        return null;
    }

    return (
        <ApolloProvider client={client}>
            <ThemeProvider value={DefaultTheme}>
                <Tabs
                    screenOptions={{
                        headerShown: false,
                        tabBarButton: HapticTab,
                        tabBarBackground: TabBarBackground,
                        tabBarStyle: Platform.select({
                            ios: {
                                position: 'absolute',
                            },
                            default: {},
                        }),
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
                                if (path === "/activity") {
                                    return <TouchableOpacity onPress={() => {
                                        console.log("NIG")
                                    }} style={{justifyContent: "center", width: 60, height: 80}}>
                                        <Octicons name="play" size={60} style={{position: "absolute", top: -10}}
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
                <StatusBar style="auto"/>
            </ThemeProvider>
        </ApolloProvider>
    );
}

export default RootLayout;
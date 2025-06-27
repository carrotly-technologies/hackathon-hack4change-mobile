import {DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Tabs} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import 'react-native-reanimated';
import {HapticTab} from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import {Platform} from "react-native";
import React from "react";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";


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
                        }}
                    />
                    <Tabs.Screen
                        name="rank"
                        options={{
                        }}
                    />
                    <Tabs.Screen
                        name="activity"
                        options={{
                        }}
                    />
                    <Tabs.Screen
                        name="events"
                        options={{
                        }}
                    />
                    <Tabs.Screen
                        name="profile"
                        options={{}}
                    />
                </Tabs>
                <StatusBar style="auto"/>
            </ThemeProvider>
        </ApolloProvider>
    );
}

export default RootLayout;
import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Tabs} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import 'react-native-reanimated';

import {useColorScheme} from '@/hooks/useColorScheme';
import {HapticTab} from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import {Platform} from "react-native";
import {IconSymbol} from "@/components/ui/IconSymbol";
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

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    if (!loaded) {
        return null;
    }


    return (
        <ApolloProvider client={client}>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
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
                            title: 'Index',
                            tabBarIcon: ({color}) => <IconSymbol size={28} name="house.fill" color={color}/>,
                        }}
                    />
                    <Tabs.Screen
                        name="page1"
                        options={{
                            title: 'Page1',
                            tabBarIcon: ({color}) => <IconSymbol size={28} name="house.fill" color={color}/>,
                        }}
                    />
                    <Tabs.Screen
                        name="page2"
                        options={{
                            title: 'Page2',
                            tabBarIcon: ({color}) => <IconSymbol size={28} name="house.fill" color={color}/>,
                        }}
                    />
                </Tabs>
                <StatusBar style="auto"/>
            </ThemeProvider>
        </ApolloProvider>
    );
}

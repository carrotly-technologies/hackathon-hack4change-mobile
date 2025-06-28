import {DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack, usePathname} from 'expo-router';
import React from "react";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import {useActivityStore} from "@/store/activity.store";

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
    const {} = useActivityStore();

    if (!loaded) {
        return null;
    }

    return (
        <ApolloProvider client={client}>
            <ThemeProvider value={DefaultTheme}>
                <Stack screenOptions={{headerShown: false}}>
                    <Stack.Screen name="home" options={{title: 'Home', headerShown: false, gestureEnabled: false}}/>
                    <Stack.Screen name="activity"
                                  options={{title: 'Asset', headerShown: false, gestureEnabled: false}}/>
                </Stack>
            </ThemeProvider>
        </ApolloProvider>
    );
}

export default RootLayout;
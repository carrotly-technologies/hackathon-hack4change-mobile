import { ActivityStartedGuard } from '@/components/activity-started/ActivityStartedGuard';
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import React from "react";

const client = new ApolloClient({
    uri: "https://h4c-api.rabbithole.carrotly.tech/graphql",
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
            <ActivityStartedGuard>
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="home" options={{ title: 'Home', headerShown: false, gestureEnabled: false }} />
                    <Stack.Screen name="activity"
                        options={{
                            title: 'Asset',
                            headerShown: true,
                            gestureEnabled: false,
                            headerBackVisible: true
                        }} />
                </Stack>
            </ActivityStartedGuard>
        </ApolloProvider>
    );
}

export default RootLayout;
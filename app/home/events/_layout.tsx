import { Stack } from "expo-router";
import React from "react";

const EventsLayout = () => {
    return (
        <Stack
            screenOptions={{
                gestureEnabled: true,
                headerShown: false,
            }}>
            <Stack.Screen name="index" />
        </Stack>
    );
};

export default EventsLayout;
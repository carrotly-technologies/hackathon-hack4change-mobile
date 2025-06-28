import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";

const EventsLayout = () => {
    return <Stack
        screenOptions={{
            gestureEnabled: true,
            headerShown: true,
        }}>
        <Stack.Screen name="index" options={{
            title: 'Nadchodzące wydarzenia',
            headerRight: () => (
                <Ionicons name="filter-circle-outline" size={32} />
            )
        }} />
    </Stack>
}

export default EventsLayout;
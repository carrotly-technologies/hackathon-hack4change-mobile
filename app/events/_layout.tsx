import {Stack} from "expo-router";

const EventsLayout = () => {
    return <Stack
        screenOptions={{
            gestureEnabled: true,
            headerShown: false,
        }}>
        <Stack.Screen name="index" options={{title: ''}}/>
    </Stack>
}

export default EventsLayout;
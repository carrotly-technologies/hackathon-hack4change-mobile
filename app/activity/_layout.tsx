import {Stack} from "expo-router";

const ActivityLayout = () => {
    return <Stack
        screenOptions={{
            gestureEnabled: false,
            headerShown: false,
        }}>
        <Stack.Screen name="index" options={{title: ''}}/>
        <Stack.Screen name="finish" options={{title: ''}}/>
    </Stack>
}

export default ActivityLayout;
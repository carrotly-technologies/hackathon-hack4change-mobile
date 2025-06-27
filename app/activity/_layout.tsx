import {Stack} from "expo-router";

const ActivityLayout = () => {
    return <Stack
        screenOptions={{
            gestureEnabled: true,
            headerShown: false,
        }}>
        <Stack.Screen name="index" options={{title: ''}}/>
    </Stack>
}

export default ActivityLayout;
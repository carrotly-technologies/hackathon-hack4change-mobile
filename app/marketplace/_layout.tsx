import {Stack} from "expo-router";

const MarketplaceLayout = () => {
    return <Stack
        screenOptions={{
            gestureEnabled: true,
            headerShown: true,
            headerBackVisible: true,
            headerBackTitle: 'Back',
        }}>
        <Stack.Screen name="index" options={{title: 'Coin market'}}/>
        <Stack.Screen name="[id]" options={{title: 'Coin market'}}/>
    </Stack>
}

export default MarketplaceLayout;
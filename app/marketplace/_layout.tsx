import {router, Stack} from "expo-router";
import {TouchableOpacity} from "react-native";
import {Entypo} from "@expo/vector-icons";
import React from "react";

const MarketplaceLayout = () => {
    return <Stack
        screenOptions={{
            gestureEnabled: true,
            headerShown: true,
        }}>
        <Stack.Screen name="index" options={{
            title: 'Coin market', headerLeft: () => <TouchableOpacity onPress={() => {
                router.back()
            }}>
                <Entypo name="chevron-left" size={25} color="#437454"/>
            </TouchableOpacity>
        }}/>
        <Stack.Screen name="[id]" options={{
            title: 'Szczegóły nagrody', headerLeft: () => <TouchableOpacity onPress={() => {
                router.back()
            }}>
                <Entypo name="chevron-left" size={25} color="#437454"/>
            </TouchableOpacity>
        }}/>
    </Stack>
}

export default MarketplaceLayout;
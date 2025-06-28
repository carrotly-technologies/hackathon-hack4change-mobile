import {SafeAreaView, StyleSheet, TouchableOpacity, View} from "react-native";
import Map from "@/components/screens/activity/Map";
import {useActivityStore} from "@/store/activity.store";
import {Entypo, Octicons} from "@expo/vector-icons";
import React from "react";
import ActivityTrackdown from "@/components/screens/activity/ActivityTrackdown";
import {router} from "expo-router";

const ActivityIndex = () => {
    const {isPlaying} = useActivityStore();

    return <SafeAreaView style={{flex: 1}}>
        <ActivityTrackdown/>
        <Map/>

        <TouchableOpacity style={styles.plusButtonContainer}>
            <Octicons name="ellipsis" size={40} color="black"/>
        </TouchableOpacity>

        <View style={styles.bottomButtonsContainer}>
            <TouchableOpacity style={styles.circleButton} onPress={() => {
            }}>
                <Entypo name="controller-play" size={50} color="black"/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.circleButton} onPress={() => router.replace("/activity/finish")}>
                <Entypo name="controller-stop" size={50} color="black"/>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    plusButtonContainer: {
        position: "absolute",
        zIndex: 20,
        bottom: 120,
        left: 10,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10,
        elevation: 10,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "black",
        borderWidth: 5
    },
    bottomButtonsContainer: {
        position: "absolute",
        bottom: 20,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        paddingHorizontal: 20
    },
    circleButton: {
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 1,
        width: 100,
        height: 100,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        elevation: 5
    }
})

export default ActivityIndex;

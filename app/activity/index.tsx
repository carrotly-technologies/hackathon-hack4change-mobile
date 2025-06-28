import {SafeAreaView, StyleSheet, TouchableOpacity, View} from "react-native";
import Map from "@/components/screens/activity/Map";
import {useActivityStore} from "@/store/activity.store";
import {Entypo, Octicons} from "@expo/vector-icons";
import React, {useEffect, useRef} from "react";
import ActivityTrackdown from "@/components/screens/activity/ActivityTrackdown";
import {router} from "expo-router";

const ActivityIndex = () => {
    const {isPlaying, setPlaying, incrementElapsedTime, setElapsedTime} = useActivityStore();
    const timerRef = useRef<number | null>(null);

    // Set up timer effect
    useEffect(() => {
        if (isPlaying) {
            timerRef.current = window.setInterval(() => {
                incrementElapsedTime();
            }, 1000);
        } else if (timerRef.current) {
            // Clear the timer when not playing
            clearInterval(timerRef.current);
            timerRef.current = null;
        }

        // Cleanup on unmount
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [isPlaying, incrementElapsedTime]);

    const handlePlayPress = () => {
        setPlaying(true);
    };

    const handleStopPress = () => {
        setPlaying(false);
        router.replace("/activity/finish");
    };

    return <SafeAreaView style={{flex: 1}}>
        <ActivityTrackdown/>
        <Map/>

        <TouchableOpacity style={styles.plusButtonContainer}>
            <Octicons name="ellipsis" size={40} color="black"/>
        </TouchableOpacity>

        <View style={styles.bottomButtonsContainer}>
            <TouchableOpacity
                style={[styles.circleButton, isPlaying && styles.activeButton]}
                onPress={handlePlayPress}
                disabled={isPlaying}
            >
                <Entypo name="controller-play" size={50} color={isPlaying ? "white" : "black"}/>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.circleButton}
                onPress={handleStopPress}
            >
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
    },
    activeButton: {
        backgroundColor: "green",
        borderColor: "white",
    }
})

export default ActivityIndex;

import {StyleSheet, Text, View} from "react-native";
import {useActivityStore} from "@/store/activity.store";

const ActivityTrackdown = () => {
    const {elapsedTime, distance} = useActivityStore();

    // Format elapsed time (seconds) to HH:MM:SS
    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Format distance (meters) to kilometers with 2 decimal places
    const formatDistance = (meters: number) => {
        const kilometers = meters / 1000;
        return kilometers.toFixed(2);
    };

    return <View style={styles.container}>
        <View style={styles.entryContainer}>
            <Text style={styles.header}>Time</Text>
            <Text style={styles.value}>{formatTime(elapsedTime)}</Text>
        </View>
        <View style={styles.entryContainer}>
            <Text style={styles.header}>Distance</Text>
            <Text style={styles.value}>{formatDistance(distance)} <Text style={styles.unit}>km</Text></Text>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        height: 75,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    entryContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        fontSize: 18,
    },
    value: {
        fontSize: 32
    },
    unit: {
        fontSize: 18,
        color: '#666'
    }
})

export default ActivityTrackdown;

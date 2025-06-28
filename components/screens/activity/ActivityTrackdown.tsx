import {StyleSheet, Text, View} from "react-native";
import {useActivityStore} from "@/store/activity.store";

const ActivityTrackdown = () => {
    const {elapsedTime, distance, trashCount} = useActivityStore();

    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

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
        <View style={styles.entryContainer}>
            <Text style={styles.header}>Trash</Text>
            <Text style={styles.value}>{trashCount}</Text>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        height: 90,
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef',
        paddingVertical: 10,
        borderRadius: 30,
    },
    entryContainer: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 15,
    },
    header: {
        fontSize: 16,
        color: '#6c757d',
        marginBottom: 5,
        fontWeight: '500',
    },
    value: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000',
    },
    unit: {
        fontSize: 18,
        color: '#6c757d',
        fontWeight: 'normal',
    }
})

export default ActivityTrackdown;

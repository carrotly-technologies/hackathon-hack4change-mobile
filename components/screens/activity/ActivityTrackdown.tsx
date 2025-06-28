import {StyleSheet, Text, View} from "react-native";

const ActivityTrackdown = () => {
    return <View style={styles.container}>
        <View style={styles.entryContainer}>
            <Text style={styles.header}>Time</Text>
            <Text style={styles.value}>01:03:04</Text>
        </View>
        <View style={styles.entryContainer}>
            <Text style={styles.header}>Time</Text>
            <Text style={styles.value}>01:03:04</Text>
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
    }
})

export default ActivityTrackdown;
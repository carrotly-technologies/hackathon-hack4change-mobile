import {SafeAreaView, StyleSheet, TouchableOpacity} from "react-native";
import Map from "@/components/screens/activity/Map";
import {FontAwesome5} from "@expo/vector-icons";
import React from "react";
import ActivityDropdown from "@/components/screens/activity/ActivitiyDropdown";

const ActivityIndex = () => {
    return <SafeAreaView>
        <ActivityDropdown/>
        <Map/>

        <TouchableOpacity style={styles.threeButtonsContainer}>
            <FontAwesome5 name="ellipsis-h" size={30} color="black"/>
        </TouchableOpacity>

    </SafeAreaView>
}

const styles = StyleSheet.create({
    threeButtonsContainer: {
        position: "absolute",
        zIndex: 20,
        bottom: 120,
        right: 10,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 100,
        elevation: 10,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "black",
        borderWidth: 5
    },
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
    }
})

export default ActivityIndex;
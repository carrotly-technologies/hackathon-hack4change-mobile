import {SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useActivityStore} from "@/store/activity.store";
import React, {useEffect, useState} from "react";
import ActivitiyDropdown from "@/components/screens/activity/ActivitiyDropdown";
import Map from "@/components/screens/activity/Map";
import {router} from "expo-router";

const FinishScreen = () => {
    const {setPlaying, elapsedTime, setElapsedTime} = useActivityStore();
    const [activityName, setActivityName] = useState("");
    const [description, setDescription] = useState("");

    // Format elapsed time (seconds) to HH:MM:SS
    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Stop the timer when the component mounts
    useEffect(() => {
        setPlaying(false);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                <TouchableOpacity style={styles.header} onPress={() => router.replace('/home/activity')}>
                    <Text style={styles.headerTitle}>Zapisz aktywność</Text>
                </TouchableOpacity>

                <View style={styles.inputSection}>
                    <Text style={styles.inputLabel}>Nazwa</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Input Text"
                        value={activityName}
                        onChangeText={setActivityName}
                        placeholderTextColor="#999"
                    />
                </View>

                <View style={styles.statsGrid}>
                    <View style={styles.statItem}>
                        <Text style={styles.statLabel}>Czas</Text>
                        <Text style={styles.statValue}>{formatTime(elapsedTime)}</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statLabel}>Dystans</Text>
                        <Text style={styles.statValue}>3.2<Text style={styles.statUnit}>km</Text></Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statLabel}>Ilość śmieci</Text>
                        <Text style={styles.statValue}>10</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statLabel}>Punkty</Text>
                        <Text style={styles.statValue}>45</Text>
                    </View>
                </View>

                <View style={styles.mediaSection}>
                    <View style={styles.mapContainer}>
                        <Map/>
                    </View>
                    <View style={styles.photoContainer}>
                        <View style={styles.photoPlaceholder}>
                            <Text style={styles.photoIcon}>🖼️</Text>
                        </View>
                    </View>
                </View>

                <ActivitiyDropdown/>

                <View style={styles.descriptionSection}>
                    <Text style={styles.descriptionLabel}>Opis</Text>
                    <TextInput
                        style={styles.descriptionInput}
                        placeholder="Napisz coś o tej aktywności, możesz kogoś również oznaczyć"
                        value={description}
                        onChangeText={setDescription}
                        multiline
                        placeholderTextColor="#999"
                    />
                </View>

                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={() => {
                        // Reset elapsed time when saving activity
                        setPlaying(false);
                        // Reset elapsed time to 0 for the next activity
                        setElapsedTime(0);
                        router.replace('/home/activity');
                    }}
                >
                    <Text style={styles.saveButtonText}>Zapisz aktywność</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollContainer: {
        flex: 1,
    },
    header: {
        backgroundColor: 'white',
        paddingVertical: 20,
        paddingHorizontal: 20,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
    },
    inputSection: {
        backgroundColor: 'white',
        padding: 20,
        marginTop: 1,
    },
    inputLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    statsGrid: {
        backgroundColor: 'white',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 20,
        marginTop: 1,
    },
    statItem: {
        width: '50%',
        paddingVertical: 15,
    },
    statLabel: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    statValue: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000',
    },
    statUnit: {
        fontSize: 20,
        fontWeight: 'normal',
    },
    mediaSection: {
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 20,
        marginTop: 1,
    },
    mapContainer: {
        flex: 1,
        marginRight: 10,
        height: 120,
    },
    photoContainer: {
        width: 120,
    },
    photoPlaceholder: {
        height: 120,
        backgroundColor: '#e8e8e8',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    photoIcon: {
        fontSize: 24,
        color: '#999',
    },
    descriptionSection: {
        backgroundColor: 'white',
        padding: 20,
        marginTop: 1,
    },
    descriptionLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    descriptionInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
        minHeight: 80,
        textAlignVertical: 'top',
    },
    saveButton: {
        backgroundColor: '#5a4fcf',
        margin: 20,
        borderRadius: 25,
        paddingVertical: 18,
        alignItems: 'center',
    },
    saveButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default FinishScreen;

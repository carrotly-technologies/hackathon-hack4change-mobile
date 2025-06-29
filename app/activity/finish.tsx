import { useActivityEndMutation } from "@/api/__generated__/graphql";
import ActivitiyDropdown from "@/components/screens/activity/ActivitiyDropdown";
import Map from "@/components/screens/activity/Map";
import Card from "@/components/ui/Card";
import { useActivityStore } from "@/store/activity.store";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const FinishScreen = () => {
    const {
        setPlaying,
        elapsedTime,
        setElapsedTime,
        distance,
        resetLocations,
        setPaused,
        trashCount,
        resetTrashCount,
        activityId,
        locations,
        trashLocations,
        resetTrashLocations,
        type
    } = useActivityStore();
    const [activityName, setActivityName] = useState("");
    const [description, setDescription] = useState("");
    const [endActivity, { data, loading, error }] = useActivityEndMutation();

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

    useEffect(() => {
        setPlaying(false);
    }, [setPlaying]);

    useEffect(() => {
        if (data) {
            router.replace('/home/activity');
        }
    }, [data]);

    useEffect(() => {
        if (error) {
            router.replace('/home/activity');
        }
    }, [error]);

    return (
        <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
            <ScrollView style={styles.scrollContainer}>
                <TouchableOpacity style={styles.header} onPress={() => router.replace('/home/activity')}>
                    <Text style={styles.headerTitle}>Zapisz aktywność</Text>
                </TouchableOpacity>

                <View style={styles.inputSection}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Nazwa aktywności...."
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
                        <Text style={styles.statValue}>{formatDistance(distance)}<Text style={styles.statUnit}>km</Text></Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statLabel}>Ilość śmieci</Text>
                        <Text style={styles.statValue}>{trashCount}</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statLabel}>Punkty</Text>
                        <Text style={styles.statValue}>45</Text>
                    </View>
                </View>

                <View style={styles.mediaSection}>
                    <View style={styles.mapContainer}>
                        <Map points={trashLocations} paths={locations.map(p => ({
                            coordinates: [{
                                latitude: p.latitude,
                                longitude: p.longitude
                            }],
                            color: "red",
                            width: 10
                        }))} />
                    </View>
                    <View style={styles.photoContainer}>
                        <View style={styles.photoPlaceholder}>
                            <Text style={styles.photoIcon}>🖼️</Text>
                        </View>
                    </View>
                </View>

                <ActivitiyDropdown defaultValue={type || undefined} />

                <Card styles={{ marginVertical: 20 }}>
                    <Text style={styles.descriptionLabel}>Szczegóły</Text>
                    <TextInput
                        style={styles.descriptionInput}
                        placeholder="Napisz coś o tej aktywności, możesz kogoś również oznaczyć"
                        value={description}
                        onChangeText={setDescription}
                        multiline
                        placeholderTextColor="#999"
                    />
                </Card>

                <View style={styles.bottomSheet}>
                    <TouchableOpacity
                        style={styles.saveButton}
                        onPress={() => {
                            setPlaying(false);
                            setPaused(false);
                            setElapsedTime(0);
                            resetLocations();
                            resetTrashCount();
                            resetTrashLocations();

                            endActivity({
                                variables: {
                                    input: {
                                        activityId: activityId,
                                        description: description,
                                        name: activityName,
                                        distance: distance,
                                        imageUrls: []
                                    }
                                }
                            });
                        }}
                    >
                        <Text style={styles.saveButtonText}>Zapisz aktywność</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: '#f8f9fa',
    },
    scrollContainer: {
        flex: 1,
    },
    header: {
        backgroundColor: '#fff',
        paddingVertical: 20,
        paddingHorizontal: 20,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
    },
    inputSection: {
        backgroundColor: '#fff',
        padding: 20,
        marginTop: 1,
    },
    inputLabel: {
        fontSize: 14,
        color: '#6c757d',
        marginBottom: 8,
        fontWeight: '500',
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#e9ecef',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#f8f9fa',
        color: '#000',
    },
    statsGrid: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 20,
        marginTop: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statItem: {
        width: '50%',
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statLabel: {
        fontSize: 16,
        color: 'black',
        marginBottom: 5,
        fontWeight: '500',
    },
    statValue: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000',
    },
    statUnit: {
        fontSize: 20,
        fontWeight: 'normal',
        color: '#6c757d',
    },
    mediaSection: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        padding: 20,
        marginTop: 1,
        gap: 10
    },
    mapContainer: {
        flex: 1,
        height: 120,
        borderRadius: 8,
        overflow: 'hidden',
    },
    photoContainer: {
        flex: 1
    },
    photoPlaceholder: {
        height: 120,
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e9ecef',
    },
    photoIcon: {
        fontSize: 24,
        color: '#6c757d',
    },
    descriptionSection: {
        backgroundColor: '#fff',
        padding: 20,
        marginTop: 1,
    },
    descriptionLabel: {
        fontSize: 16,
        marginBottom: 8,
        fontWeight: '500',
    },
    descriptionInput: {
        borderWidth: 1,
        borderColor: '#e9ecef',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#f8f9fa',
        minHeight: 80,
        textAlignVertical: 'top',
        color: '#000',
    },
    saveButton: {
        backgroundColor: '#1D6936',
        margin: 20,
        borderRadius: 20,
        width: '80%',
        paddingVertical: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 15,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    bottomSheet: {
        height: 100,
        backgroundColor: '#fff',
        borderTopColor: '#e9ecef',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
    }
});

export default FinishScreen;

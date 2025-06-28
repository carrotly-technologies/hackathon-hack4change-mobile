import {Alert, StyleSheet, TouchableOpacity, View} from "react-native";
import Map from "@/components/screens/activity/Map";
import {useActivityStore} from "@/store/activity.store";
import {Entypo, FontAwesome} from "@expo/vector-icons";
import React, {useEffect, useRef, useState} from "react";
import ActivityTrackdown from "@/components/screens/activity/ActivityTrackdown";
import {router} from "expo-router";
import * as Location from 'expo-location';
import {SafeAreaView} from "react-native-safe-area-context";
import {
    useActivityAddPathPointMutation,
    useActivityAddTrashMutation,
    useActivityStartMutation
} from "@/api/__generated__/graphql";

const ActivityIndex = () => {
    const {
        isPlaying, setPlaying,
        isPaused, setPaused,
        incrementElapsedTime, setElapsedTime,
        currentLocation, setCurrentLocation, addLocation,
        incrementDistance, resetLocations,
        incrementTrashCount, addTrashLocation, type,
        activityId, setActivityId,
        user
    } = useActivityStore();
    const timerRef = useRef<number | null>(null);
    const locationSubscription = useRef<Location.LocationSubscription | null>(null);
    const [locationPermissionGranted, setLocationPermissionGranted] = useState(false);
    const [startActivity, {data}] = useActivityStartMutation()
    const [addPoint, {}] = useActivityAddPathPointMutation()
    const [addTrash, {}] = useActivityAddTrashMutation()

    useEffect(() => {
        startActivity({
            variables: {
                input: {
                    activityType: type!,
                    userId: user!.id
                }
            }
        })
    }, []);

    useEffect(() => {
        if (data) {
            setActivityId(data?.activityStart.id)
        }
    }, [data]);

    useEffect(() => {
        (async () => {
            const {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission denied', 'Location permission is required to track distance.');
                return;
            }
            setLocationPermissionGranted(true);
        })();
    }, []);

    useEffect(() => {
        if (!isPlaying && !isPaused) {
            resetLocations();
            setPlaying(true);
        }
    }, []);

    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
        const R = 6371e3;
        const φ1 = lat1 * Math.PI / 180;
        const φ2 = lat2 * Math.PI / 180;
        const Δφ = (lat2 - lat1) * Math.PI / 180;
        const Δλ = (lon2 - lon1) * Math.PI / 180;

        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
    };

    useEffect(() => {
        if (isPlaying && !isPaused && locationPermissionGranted) {
            (async () => {
                const initialLocation = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.BestForNavigation
                });

                const locationData = {
                    latitude: initialLocation.coords.latitude,
                    longitude: initialLocation.coords.longitude,
                    timestamp: initialLocation.timestamp
                };

                setCurrentLocation(locationData);
                addLocation(locationData);
                addPoint({
                    variables: {
                        input: {
                            activityId: activityId!,
                            lon: locationData.longitude.toString(),
                            lat: locationData.latitude.toString(),
                        }
                    }
                })

                locationSubscription.current = await Location.watchPositionAsync(
                    {
                        accuracy: Location.Accuracy.BestForNavigation,
                        distanceInterval: 2,
                        timeInterval: 200
                    },
                    (newLocation) => {
                        const newLocationData = {
                            latitude: newLocation.coords.latitude,
                            longitude: newLocation.coords.longitude,
                            timestamp: newLocation.timestamp
                        };

                        if (currentLocation) {
                            const distance = calculateDistance(
                                currentLocation.latitude, currentLocation.longitude,
                                newLocationData.latitude, newLocationData.longitude
                            );


                            if (distance > 1) {
                                incrementDistance(distance);
                                setCurrentLocation(newLocationData);
                                addLocation(newLocationData);
                            }
                        } else {
                            setCurrentLocation(newLocationData);
                            addLocation(newLocationData);
                        }
                    }
                );
            })();
        } else if (locationSubscription.current) {
            locationSubscription.current.remove();
            locationSubscription.current = null;
        }

        return () => {
            if (locationSubscription.current) {
                locationSubscription.current.remove();
                locationSubscription.current = null;
            }
        };
    }, [isPlaying, isPaused, locationPermissionGranted]);

    useEffect(() => {
        if (isPlaying && !isPaused) {
            timerRef.current = window.setInterval(() => {
                incrementElapsedTime();
            }, 1000);
        } else if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [isPlaying, isPaused, incrementElapsedTime]);

    const handlePlayPress = () => {
        if (isPaused) {
            setPaused(false);
        } else {
            setPlaying(true);
            setPaused(false);
            resetLocations();
        }
    };

    const handlePausePress = () => {
        setPaused(true);
    };

    const handleStopPress = () => {
        setPlaying(false);
        setPaused(false);
        router.replace("/activity/finish");
    };

    return <SafeAreaView style={{flex: 1, paddingTop: 55, backgroundColor: "white"}}
                         edges={["bottom", "left", "right"]}>
        <ActivityTrackdown/>
        <Map/>

        <TouchableOpacity
            style={styles.plusButtonContainer}
            onPress={() => {
                incrementTrashCount();
                if (currentLocation) {
                    addTrashLocation(currentLocation);
                    addTrash({
                        variables: {
                            input: {
                                activityId: activityId!,
                                lon: currentLocation.longitude.toString(),
                                lat: currentLocation.latitude.toString()
                            }
                        }
                    })
                } else {
                    (async () => {
                        try {
                            const location = await Location.getCurrentPositionAsync({
                                accuracy: Location.Accuracy.BestForNavigation
                            });
                            const locationData = {
                                latitude: location.coords.latitude,
                                longitude: location.coords.longitude,
                                timestamp: location.timestamp
                            };
                            addTrashLocation(locationData);
                        } catch (error) {
                            console.log('Error getting trash location:', error);
                        }
                    })();
                }
            }}
        >
            <Entypo name="plus" size={35} color="white"/>
        </TouchableOpacity>

        <View style={styles.bottomButtonsContainer}>
            {(!isPlaying || isPaused) && <>
                <TouchableOpacity
                    style={[styles.circleButton, isPaused && styles.pausedButton]}
                    onPress={handlePlayPress}
                >
                    <Entypo name="controller-play" size={50} color={isPaused ? "white" : "black"}/>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.circleButton}
                    onPress={handleStopPress}
                >
                    <Entypo name="controller-stop" size={50} color="white"/>
                </TouchableOpacity>
            </>}

            {(isPlaying && !isPaused) && <>
                <TouchableOpacity
                    style={[styles.circleButton, styles.activeButton]}
                    onPress={handlePausePress}
                >
                    <FontAwesome name="pause-circle-o" size={40} color="white"/>
                </TouchableOpacity>
            </>}
        </View>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    plusButtonContainer: {
        position: "absolute",
        zIndex: 20,
        bottom: 120,
        left: 10,
        backgroundColor: "#437454",
        padding: 12,
        borderRadius: 40,
        elevation: 5,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    bottomButtonsContainer: {
        position: "absolute",
        bottom: 20,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 15,
        paddingHorizontal: 20
    },
    circleButton: {
        backgroundColor: "#437454",
        width: 80,
        height: 80,
        borderRadius: 40,
        alignItems: "center",
        justifyContent: "center",
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    activeButton: {
        backgroundColor: "#437454",
    },
    pausedButton: {
        backgroundColor: "#437454",
    }
})

export default ActivityIndex;

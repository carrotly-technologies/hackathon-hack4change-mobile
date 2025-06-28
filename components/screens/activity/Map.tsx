import {StyleSheet, View} from "react-native";
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from "react-native-maps";
import {useActivityStore} from "@/store/activity.store";
import {Octicons} from "@expo/vector-icons";
import {useEffect, useRef} from "react";

type Point = {
    latitude: number;
    longitude: number;
    title?: string;
    description?: string;
};

type Path = {
    coordinates: { latitude: number; longitude: number }[];
    color?: string;
    width?: number;
};

const Map = ({points = [], paths = []}: { points?: Point[]; paths?: Path[] }) => {
    const {currentLocation, locations, trashLocations} = useActivityStore();
    const mapRef = useRef<MapView>(null);

    useEffect(() => {
        if (currentLocation && mapRef.current) {
            mapRef.current.animateToRegion({
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }, 1000);
        }
    }, [currentLocation]);

    return (
        <
            MapView
            ref={mapRef}
            style={styles.map}
            showsUserLocation={true}
            followsUserLocation={true}
            provider={PROVIDER_GOOGLE}
            onMapReady={() => {
                if (points.length > 0 || paths.length > 0) {
                    const coordinates = [
                        ...points.map(point => ({latitude: point.latitude, longitude: point.longitude})),
                        ...paths.flatMap(path => path.coordinates),
                        ...locations.map(loc => ({latitude: loc.latitude, longitude: loc.longitude})),
                        ...trashLocations.map(loc => ({latitude: loc.latitude, longitude: loc.longitude})),
                    ];
                    if (coordinates.length > 0 && mapRef.current) {
                        mapRef.current.fitToCoordinates(coordinates, {
                            edgePadding: {top: 3, right: 3, bottom: 3, left: 3},
                            animated: true,
                        });
                    }
                }
            }
            }
            initialRegion={
                {
                    latitude: 54.4082,
                    longitude:
                        18.6175,
                    latitudeDelta:
                        0.0922,
                    longitudeDelta:
                        0.0421,
                }
            }
        >
            {locations.length > 1 && (
                <Polyline
                    coordinates={locations.map(loc => ({
                        latitude: loc.latitude,
                        longitude: loc.longitude,
                    }))}
                    strokeColor="#6f42c1"
                    strokeWidth={4}
                />
            )}

            {trashLocations.map((loc, index) => (
                <Marker
                    key={`trash-${index}-${loc.timestamp}`}
                    coordinate={{
                        latitude: loc.latitude,
                        longitude: loc.longitude,
                    }}
                >
                    <View style={styles.trashMarker}>
                        <Octicons name="trash" size={16} color="#fff"/>
                    </View>
                </Marker>
            ))}

            {points.map((point, index) => (
                <Marker
                    key={`point-${index}`}
                    coordinate={{
                        latitude: point.latitude,
                        longitude: point.longitude,
                    }}
                    title={point.title}
                    description={point.description}
                />
            ))}

            {paths.map((path, index) => (
                <Polyline
                    key={`path-${index}`}
                    coordinates={path.coordinates}
                    strokeColor={path.color || "#000"}
                    strokeWidth={path.width || 3}
                />
            ))}
        </MapView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    trashMarker: {
        backgroundColor: '#dc3545',
        borderRadius: 15,
        padding: 8,
        borderWidth: 2,
        borderColor: '#fff',
    },
});

export default Map;

import {StyleSheet, View} from "react-native";
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from "react-native-maps";
import {useActivityStore} from "@/store/activity.store";
import {Octicons} from "@expo/vector-icons";
import {useEffect, useRef} from "react";

const Map = () => {
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
        <MapView
            ref={mapRef}
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            showsUserLocation
            followsUserLocation
            initialRegion={{
                latitude: 52.2297,
                longitude: 21.0122,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
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

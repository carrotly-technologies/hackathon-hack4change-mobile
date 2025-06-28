import {StyleSheet} from "react-native";
import MapView from "react-native-maps";

const Map = () => {
    return (
        <MapView
            style={styles.map}
            initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        >
            {/*<Marker*/}
            {/*    coordinate={{*/}
            {/*        latitude: 37.78825,*/}
            {/*        longitude: -122.4324,*/}
            {/*    }}*/}
            {/*    title="My Location"*/}
            {/*    description="This is a marker in San Francisco"*/}
            {/*/>*/}
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
});

export default Map;
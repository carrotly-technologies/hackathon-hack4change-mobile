import {FC} from "react";
import {MemoFeedProps} from "@/utils/types";
import Card from "@/components/ui/Card";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {Avatar} from 'react-native-elements';
import {Image} from "expo-image";

const MemoFeed: FC<MemoFeedProps> = ({feed}) => {
    return <>
        {feed.map((item) => (
            <Card key={item.id} styles={styles.containerStyle}>
                <View style={styles.avatarContainer}>
                    <Avatar rounded source={{uri: item.avatar}} avatarStyle={styles.avatarStyle}
                            containerStyle={{width: 50, height: 50}}/>
                    <View style={styles.usernameContainer}>
                        <Text style={styles.usernameTextStyle}>{item.name}</Text>
                        <Text>{item.details}</Text>
                    </View>
                </View>
                <View style={styles.memoParametersStyle}>
                    <View style={styles.memoParameterDetailsStyle}>
                        <Text style={styles.memoParameterHeader}>Dystans</Text>
                        <Text style={styles.memoParameterValue}>{item.length.toFixed(1)} km</Text>
                    </View>
                    <View style={styles.memoParameterDetailsStyle}>
                        <Text style={styles.memoParameterHeader}>Ilość śmieci</Text>
                        <Text style={styles.memoParameterValue}>{(item.points / 10).toFixed(1)}</Text>
                    </View>
                    <View style={styles.memoParameterDetailsStyle}>
                        <Text style={styles.memoParameterHeader}>Punkty</Text>
                        <Text style={styles.memoParameterValue}>{item.points}</Text>
                    </View>
                    <View style={styles.memoParameterDetailsStyle}>
                        <Text style={styles.memoParameterHeader}>Osiągnięcia</Text>
                        <Text style={styles.memoParameterValue}>{item.achievements}</Text>
                    </View>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{}}>
                    {item.images.map((image, index) => (<Image
                        key={index}
                        source={{uri: image}}
                        style={styles.image}
                    />))}
                </ScrollView>
            </Card>
        ))}
    </>
}

const styles = StyleSheet.create({
    containerStyle: {
        gap: 15,
        margin: 10,
    },
    avatarContainer: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        marginBottom: 10,
    },
    avatarStyle: {
        borderWidth: 1,
        borderRadius: 50,
        borderColor: "#e9ecef",
    },
    usernameContainer: {
        flexDirection: "column",
    },
    memoParameterDetailsStyle: {
        flexDirection: "column",
        alignItems: "center",
    },
    usernameTextStyle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#000",
    },
    memoParametersStyle: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#f8f9fa",
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    memoParameterHeader: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#6c757d",
        marginBottom: 5,
    },
    memoParameterValue: {
        fontSize: 16,
        fontWeight: "600",
        color: "#000",
    },
    image: {
        width: 300,
        height: 150,
        borderRadius: 8,
        marginHorizontal: 8
    }
})

export default MemoFeed;

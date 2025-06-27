import {FC} from "react";
import {MemoFeedProps} from "@/utils/types";
import Card from "@/components/ui/Card";
import {StyleSheet, Text, View} from "react-native";
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
                    </View>
                </View>
                <View style={styles.memoParametersStyle}>
                    <View style={styles.memoParameterDetailsStyle}>
                        <Text style={styles.memoParameterHeader}>Dystans</Text>
                        <Text>{item.length.toFixed(1)}</Text>
                    </View>
                    <View style={styles.memoParameterDetailsStyle}>
                        <Text style={styles.memoParameterHeader}>Ilość śmieci</Text>
                        <Text>{(item.points / 10).toFixed(1)}</Text>
                    </View>
                    <View style={styles.memoParameterDetailsStyle}>
                        <Text style={styles.memoParameterHeader}>Punkty</Text>
                        <Text>{item.points}</Text>
                    </View>
                    <View style={styles.memoParameterDetailsStyle}>
                        <Text style={styles.memoParameterHeader}>Osiągnięcia</Text>
                        <Text>{item.achievements}</Text>
                    </View>
                </View>
                <Image
                    source={{uri: "https://picsum.photos/400/500"}}
                    style={styles.image}
                />
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
    },
    avatarStyle: {
        borderWidth: 1,
        borderRadius: 50
    },
    usernameContainer: {
        flexDirection: "column",
    },
    memoParameterDetailsStyle: {
        flexDirection: "column",
    },
    usernameTextStyle: {
        fontSize: 16,
    },
    memoParametersStyle: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    memoParameterHeader: {
        fontSize: 12,
        fontWeight: "bold",
    },
    image: {
        width: "80%",
        height: 130,
        margin: "auto"
    }
})

export default MemoFeed;
import {StyleSheet, View, ViewStyle} from "react-native";

const Card = ({children, styles}: { children: React.ReactNode, styles: ViewStyle }) => {
    return <View style={[styling.container, styles]}>
        {children}
    </View>
}

const styling = StyleSheet.create({
    container: {
        borderColor: "grey",
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
    }
})

export default Card;
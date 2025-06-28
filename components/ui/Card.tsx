import {StyleSheet, View, ViewStyle} from "react-native";

const Card = ({children, styles}: { children: React.ReactNode, styles?: ViewStyle }) => {
    return <View style={[styling.container, styles]}>
        {children}
    </View>
}

const styling = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    }
})

export default Card;

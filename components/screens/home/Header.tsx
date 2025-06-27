import {StyleSheet, Text, View} from "react-native";

const Header = () => {
    return <View style={styles.container}>
        <Text style={styles.header}>Hej, [name]!</Text>
        <Text style={styles.subheader}>Co chcesz zrobic?</Text>
    </View>
}

const styles = StyleSheet.create({
    header: {
        fontSize: 36,
    },
    subheader: {
        fontSize: 16,
    },
    container: {
        padding: 20,
        borderBottomWidth: 1,
    }
});

export default Header;
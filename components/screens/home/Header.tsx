import {StyleSheet, Text, View} from "react-native";

const Header = () => {
    return <View style={styles.container}>
        <Text style={styles.header}>Hej, [name]!</Text>
        <Text style={styles.subheader}>Co chcesz zrobić?</Text>
    </View>
}

const styles = StyleSheet.create({
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 5,
    },
    subheader: {
        fontSize: 16,
        color: '#6c757d',
    },
    container: {
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef',
    }
});

export default Header;

import {ActivityIndicator, StyleSheet, Text, View} from "react-native";
import {useUserQuery} from "@/api/__generated__/graphql";

const Header = () => {

    const {data, loading, error} = useUserQuery()

    if (loading || !data) {
        return <View>
            <ActivityIndicator/>
        </View>
    }

    return <View style={styles.container}>
        <Text style={styles.header}>{data.user?.firstname} {data.user?.lastname}</Text>
        <Text style={styles.subheader}>Co chcesz zrobić?</Text>
    </View>
}

const styles = StyleSheet.create({
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#205231',
        marginBottom: 5,
    },
    subheader: {
        fontSize: 16,
        color: '#205231',
    },
    container: {
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef',
        elevation: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    }
});

export default Header;

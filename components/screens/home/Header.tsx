import {StyleSheet, Text, View} from "react-native";
import CarrotCoin from "@/components/svg/CarrotCoin";
import {useActivityStore} from "@/store/activity.store";

const Header = () => {

    const {user} = useActivityStore()


    return <View style={styles.container}>
        <View style={styles.nameContainer}>
            <Text style={styles.header}>{user?.firstname} {user?.lastname}</Text>
            <Text style={styles.subheader}>Co chcesz zrobić?</Text>
        </View>
        <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 5}}>
            <CarrotCoin width={38} height={38}/>
            <Text style={styles.carrotCoinTitle}>{user?.coins ?? 0}</Text>
        </View>
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
    carrotCoinTitle: {
        fontSize: 16,
        color: 'black',
        fontWeight: "bold"
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    nameContainer: {}
});

export default Header;

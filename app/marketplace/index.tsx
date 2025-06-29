import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Card from "@/components/ui/Card";
import CarrotCoin from "@/components/svg/CarrotCoin";
import {useMarketplacesQuery} from "@/api/__generated__/graphql";
import {router} from "expo-router";
import {Entypo} from "@expo/vector-icons";
import React from "react";
import {LinearGradient} from "expo-linear-gradient";
import {useActivityStore} from "@/store/activity.store";

const MarketplaceIndex = () => {

    const {data, loading, error} = useMarketplacesQuery({
        variables: {
            input: {}
        }
    })

    const {user} = useActivityStore();

    if (loading) return <Text>Loading...</Text>
    if (error) return <Text>Error...</Text>

    return <LinearGradient
        start={{x: 1, y: 0}}
        end={{x: 0, y: 1}}
        colors={['#eeeeee', '#d1e8b0']}
        style={{flex: 1}}
    >
        <ScrollView style={styles.scrollView}>
            <Card styles={styles.headerCard}>
                <Text style={styles.titleText}>
                    Zbieraj EcoCoiny i wymieniaj je na nagrody!
                </Text>
                <View style={styles.coinContainer}>
                    <Text style={{fontSize: 12}}>Twoje coiny</Text>
                    <View style={styles.coinRow}>
                        <Text style={styles.coinValue}>{user?.coins}</Text>
                        <CarrotCoin width={38} height={38}/>
                    </View>
                </View>
            </Card>
            {data?.marketplaces.data.map(marketplace => (
                <Card styles={styles.card} key={marketplace.id}>
                    <View style={styles.coinContainer}>
                        <Text style={styles.titleText}>
                            {marketplace.name}
                        </Text>
                        <TouchableOpacity onPress={() => router.push(`/marketplace/${marketplace.id}` as const)}>
                            <Entypo name="chevron-with-circle-right" size={35} color="#437454"/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.coinContainer}>
                        <Text style={styles.coinLabel}>{marketplace.description}</Text>
                        <View style={[styles.coinRow, {paddingRight: 15}]}>
                            <Text style={styles.coinMarketValue}>{marketplace.price}</Text>
                            <CarrotCoin width={25} height={25}/>
                        </View>
                    </View>
                </Card>
            ))}
        </ScrollView>
    </LinearGradient>
}

const styles = StyleSheet.create({
    scrollView: {
        padding: 10,
    },
    headerCard: {
        gap: 10,
        marginBottom: 20
    },
    card: {
        gap: 10
    },
    titleText: {
        fontWeight: "bold",
        color: "#437454",
        fontSize: 15,
    },
    coinContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    coinLabel: {
        fontSize: 12,
        width: "75%"
    },
    coinRow: {
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
    },
    coinValue: {
        fontSize: 28,
        fontWeight: "bold",
    },
    coinMarketValue: {
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default MarketplaceIndex;
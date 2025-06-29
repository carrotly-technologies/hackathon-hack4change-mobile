import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {router, useLocalSearchParams} from "expo-router";
import {useMarketplaceDetailsQuery, useMarketplacePurchaseMutation} from "@/api/__generated__/graphql";
import * as Progress from 'react-native-progress';
import Card from "@/components/ui/Card";
import {LinearGradient} from "expo-linear-gradient";
import React, {useEffect, useState} from "react";
import CarrotCoin from "@/components/svg/CarrotCoin";
import {useActivityStore} from "@/store/activity.store";

const MarketPlaceDetails = () => {
    const {id} = useLocalSearchParams()
    const {user, setUser} = useActivityStore();
    const [selected, setSelected] = useState<boolean>(false);
    const {data, loading, error} = useMarketplaceDetailsQuery({
        variables: {
            input: {
                id: id
            }
        }
    })

    const [buyItem, {
        data: purchaseData,
        loading: purchaseLoading,
        error: purchaseError
    }] = useMarketplacePurchaseMutation()

    useEffect(() => {
        if (purchaseData && !purchaseError) {
            if (user && data?.marketplace?.price) {
                setUser({
                    id: user.id,
                    email: user.email,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    avatarUrl: user.avatarUrl,
                    coins: user.coins - data.marketplace.price,
                    challengesProgress: user.challengesProgress
                })
            }

            setSelected(true);
        }
    }, [purchaseData]);

    if (loading) return <Progress.Circle/>

    const successText = `Wymieniłeś ${data?.marketplace?.price} coinów na nagrodę ze sklepu {NAZWA_FIRMY}.\n` +
        "\n" +
        "Kod rabatowy umożliwiający skorzystanie ze zniżki został wysłany na adres e-mail podany podczas rejestracji do gry.  \n" +
        "\n" +
        "Jeśli maila nie ma na Twojej skrzynce sprawdź zakładkę “oferty” lub “spam”. System filtrujący twojej skrzynki e-mail mógł błędnie sklasyfikować wiadomość od naszego zespołu.\n" +
        "\n" +
        "Jeśli będziesz miał problem z wyświetleniem kodu spróbuj odczytać wiadomość w innej przeglądarce lub skontaktuj się z nami. \n" +
        "\n" +
        "W swoim profilu możesz również przejrzeć historię zdobytych przez siebie coinów oraz historię nagród"


    return <LinearGradient
        start={{x: 1, y: 0}}
        end={{x: 0, y: 1}}
        colors={['#eeeeee', '#d1e8b0']}
        style={styles.container}
    >
        <ScrollView style={styles.scrollView}>
            <Card styles={styles.card}>
                <Text>NAZWA FIRMY</Text>
                <Text style={styles.title}>{data?.marketplace?.name}</Text>
                <Text>{selected ? successText : data?.marketplace?.description}</Text>
                {!selected && <Text>Ważność nagrody: 31.08.2025 r.</Text>}
            </Card>
            {selected && (<View style={{paddingHorizontal: "20%"}}>
                <TouchableOpacity style={styles.button} onPress={() => router.replace("/marketplace")}>
                    <Text style={styles.buttonText}>Strona główna</Text>
                </TouchableOpacity>
            </View>)}
        </ScrollView>
        {!selected && (
            <View style={styles.footer}>
                <View>
                    <Text style={styles.footerText}>Wymień za:</Text>
                    <View style={styles.coinContainer}>
                        <Text style={styles.coinText}>{data?.marketplace?.price}</Text>
                        <CarrotCoin width={25} height={25}/>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => buyItem({
                        variables: {
                            input: {
                                marketplaceId: id,
                                userId: user?.id ?? "",
                            }
                        }
                    })}
                    disabled={!user?.coins || !data?.marketplace?.price || user.coins < data.marketplace.price}
                    style={[
                        styles.button,
                        {opacity: user?.coins && data?.marketplace?.price && user.coins >= data.marketplace.price ? 1 : 0.5}
                    ]}>
                    <Text style={styles.buttonText}>Wybieram</Text>
                </TouchableOpacity>
            </View>
        )}
    </LinearGradient>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        padding: 8,
        paddingTop: 20,
    },
    card: {
        gap: 10,
        paddingVertical: 32,
    },
    title: {
        fontWeight: "bold",
        color: "#21252B",
        fontSize: 16,
    },
    footer: {
        position: "absolute",
        bottom: 0,
        height: 120,
        width: "100%",
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "white",
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
    },
    footerText: {
        fontSize: 16,
    },
    coinContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    coinText: {
        fontWeight: "bold",
        fontSize: 16,
    },
    button: {
        backgroundColor: "#437454",
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 100,
        elevation: 10,
    },
    buttonText: {
        fontSize: 18,
        color: "white",
        textAlign: "center",
    },
});

export default MarketPlaceDetails;
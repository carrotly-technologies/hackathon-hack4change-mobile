import {Text, View} from "react-native";
import {useLocalSearchParams} from "expo-router";
import {useMarketplaceDetailsQuery} from "@/api/__generated__/graphql";
import * as Progress from 'react-native-progress';
import Card from "@/components/ui/Card";
import {LinearGradient} from "expo-linear-gradient";

const MarketPlaceDetails = () => {
    const {id} = useLocalSearchParams()
    const {data, loading, error} = useMarketplaceDetailsQuery({
        variables: {
            input: {
                id: id
            }
        }
    })

    if (loading) return <Progress.Circle/>


    return <LinearGradient
        start={{x: 1, y: 0}}
        end={{x: 0, y: 1}}
        colors={['#eeeeee', '#d1e8b0']}
        style={{flex: 1}}
    >
        <View style={{padding: 8, paddingTop: 20}}>
            <Card styles={{gap: 10, paddingVertical: 32}}>
                <Text>NAZWA FIRMY</Text>
                <Text style={{fontWeight: "bold", color: "#21252B", fontSize: 16}}>{data?.marketplace?.name}</Text>
                <Text>{data?.marketplace?.description}</Text>
                <Text>Ważność nagrody: 31.08.2025 r.</Text>
            </Card>
        </View>
    </LinearGradient>
}

export default MarketPlaceDetails;
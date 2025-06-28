import { useActivitiesQuery } from "@/api/__generated__/graphql";
import MemoFeed from "@/components/screens/common/MemoFeed";
import Header from "@/components/screens/home/Header";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
    const { data, loading, error } = useActivitiesQuery({
        variables: {
            input: {},
            sort: {},
            pagination: {}
        }
    })

    return (
        <SafeAreaProvider>
            <View style={{
                height: 60,
                backgroundColor: "white",
            }}></View>
            <SafeAreaView style={{ flex: 1 }} edges={['left', 'right']}>
                <LinearGradient
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    colors={['#eeeeee', '#d1e8b0']}
                    style={{ flex: 1 }}
                >
                    <ScrollView >
                        <Header />
                        {data && <MemoFeed feed={data?.activities.data.map(dta => ({
                            id: dta.id,
                            name: dta.name,
                            details: String(dta.durationTime),
                            avatar: dta.user?.avatarUrl ?? "",
                            length: dta.distance,
                            points: dta.points,
                            achievements: "Milestone",
                            images: dta.imageUrls
                        }))} />}
                        <View style={{ height: 200 }}></View>
                    </ScrollView>
                </LinearGradient>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
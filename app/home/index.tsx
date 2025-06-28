import {ScrollView, View} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import Header from "@/components/screens/home/Header";
import MemoFeed from "@/components/screens/common/MemoFeed";
import {useActivitiesQuery} from "@/api/__generated__/graphql";

export default function Index() {
    const {data, loading, error} = useActivitiesQuery({
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
            <SafeAreaView style={{}} edges={['left', 'right']}>
                <ScrollView>
                    <Header/>
                    {data && <MemoFeed feed={data?.activities.data.map(dta => ({
                        id: dta.id,
                        name: dta.name,
                        details: String(dta.durationTime),
                        avatar: dta.user?.avatarUrl ?? "",
                        length: dta.distance,
                        points: dta.points,
                        achievements: "Milestone",
                        images: dta.imageUrls
                    }))}/>}
                    <View style={{height: 200}}></View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
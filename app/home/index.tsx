import {ScrollView, View} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import Header from "@/components/screens/home/Header";
import {memoFeedProps} from "@/content/home/home.data";
import MemoFeed from "@/components/screens/common/MemoFeed";

export default function Index() {
    return (
        <SafeAreaProvider>
            <View style={{
                height: 60,
                backgroundColor: "white",
            }}></View>
            <SafeAreaView style={{}} edges={['left', 'right']}>
                <ScrollView>
                    <Header/>
                    <MemoFeed {...memoFeedProps} />
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
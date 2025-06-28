import {SafeAreaView, ScrollView} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Header from "@/components/screens/home/Header";
import {memoFeedProps} from "@/content/home/home.data";
import MemoFeed from "@/components/screens/common/MemoFeed";

export default function Index() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{}}>
                <ScrollView>
                    <Header/>
                    <MemoFeed {...memoFeedProps} />
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
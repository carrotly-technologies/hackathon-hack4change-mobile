import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import {Entypo, Ionicons} from '@expo/vector-icons';
import Card from "@/components/ui/Card";
import {useActivityStore} from "@/store/activity.store";
import CarrotCoin from "@/components/svg/CarrotCoin";
import * as Progress from 'react-native-progress';
import {router} from "expo-router";

const ProfileScreen = () => {
    const badges = Array(10).fill(null);
    const {user} = useActivityStore();

    return (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.statsContainer}>
                    <View style={styles.statCard}>
                        <Text style={styles.statLabel}>Punkty rankingowe</Text>
                        <Text style={styles.statValue}>234</Text>
                    </View>
                    <View style={styles.statCard}>
                        <View style={styles.coinMarketHeader}>
                            <Text style={styles.statLabel}>Coin market</Text>
                            <TouchableOpacity onPress={() => router.push("/marketplace")}>
                                <Entypo name="chevron-with-circle-right" size={25} color="#437454"/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.coinValue}>
                            <TouchableOpacity>
                                <CarrotCoin width={38} height={38}/>
                            </TouchableOpacity>
                            <Text style={styles.coinStatValue}>{user?.coins} coins</Text>
                        </View>
                    </View>
                </View>

            <Card styles={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Moje odznaczenia</Text>
                    <TouchableOpacity onPress={() => console.log("")}>
                        <Entypo name="chevron-with-circle-right" size={25} color="#437454"/>
                    </TouchableOpacity>
                    </View>
                <View style={styles.badgesGrid}>
                    {badges.map((_, index) => (
                        <TouchableOpacity key={index} style={styles.badgeItem}>
                            <Ionicons name="medal-outline" size={24} color="#ccc"/>
                        </TouchableOpacity>
                    ))}
                </View>
            </Card>

            <Card styles={styles.section}>
                <Text style={styles.sectionTitle}>Trwające wyzwania</Text>

                {user?.challengesProgress.map((challenge, index) => (
                    <View key={index} style={styles.challengeItem}>
                        <Progress.Circle progress={challenge.progress / 100}
                                         color={"#437454"}/>
                        <View style={styles.challengeContent}>
                            <Text style={styles.challengeTitle}>
                                Przejdź 15 km rowerem w tygodniu
                            </Text>
                            <Text style={styles.challengeSubtitle}>5 km przejechane</Text>
                            </View>
                        </View>
                ))}

            </Card>
            <View style={{height: 100}}/>
            </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
    },
    profileInfo: {
        justifyContent: 'center',
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    coinsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    coinsText: {
        fontSize: 14,
        color: '#4CAF50',
        marginLeft: 4,
        fontWeight: '500',
    },
    settingsButton: {
        padding: 8,
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginTop: 16,
        borderRadius: 12,
        padding: 4,
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 8,
    },
    activeTab: {
        backgroundColor: '#4CAF50',
    },
    tabText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    activeTabText: {
        color: 'white',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    statsContainer: {
        flexDirection: 'row',
        marginTop: 20,
        gap: 12,
    },
    statCard: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
    },
    statValue: {
        fontSize: 48,
        fontWeight: '700',
        color: '#333',
    },
    coinStatValue: {
        fontSize: 25,
        fontWeight: '700',
    },
    coinMarketHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    coinValue: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        marginTop: 24,
        gap: 10
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 16,
        marginBottom: 8,
        fontWeight: '600',
        color: '#333',
    },
    badgesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    badgeItem: {
        width: 56,
        height: 56,
        backgroundColor: 'white',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    challengeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    challengeIndicator: {
        marginRight: 16,
    },
    progressRing: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inactiveRing: {
        borderColor: '#e0e0e0',
    },
    progressFill: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#4CAF50',
    },
    inactiveFill: {
        backgroundColor: '#e0e0e0',
    },
    challengeContent: {
        flex: 1,
    },
    challengeTitle: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
        marginBottom: 4,
    },
    challengeSubtitle: {
        fontSize: 12,
        color: '#666',
    },
});

export default ProfileScreen;
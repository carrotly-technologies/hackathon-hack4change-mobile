import {useRankingQuery} from '@/api/__generated__/graphql';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';

type User = {
    id: number;
    name: string;
    points: number;
    position: number;
};

const RankingScreen: React.FC = () => {
    const [selectedPeriod, setSelectedPeriod] = useState<'Tygodniowe' | 'Ogólne'>('Tygodniowe');

    const { data, refetch } = useRankingQuery({
        variables: {
            input: {
                limit: 10,
            }
        }
    });

    useEffect(() => {
        refetch({
            input: {
                startDate: selectedPeriod === 'Tygodniowe' ? new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) : null,
                endDate: selectedPeriod === 'Tygodniowe' ? new Date() : null,
                limit: 10,
            }
        })
    }, [selectedPeriod])

    const topUsers: User[] = data?.leaderboard?.slice(0, 3).map((v, i) => ({ id: v.id, name: `${v.firstname} ${v.lastname}`, points: v.totalPoints, position: i + 1 })) || [];
    const otherUsers: User[] = data?.leaderboard?.slice(3).map((v, i) => ({ id: v.id, name: `${v.firstname} ${v.lastname}`, points: v.totalPoints, position: i + 4 })) || [];

    const UserAvatar: React.FC<{ size?: number }> = ({ size = 60 }) => (
        <View style={[styles.avatar, { width: size, height: size }]}>
            <View style={styles.avatarIcon}>
                <View style={styles.head} />
                <View style={styles.body} />
            </View>
        </View>
    );

    const PodiumItem: React.FC<{ user: User; height: number }> = ({ user, height }) => (
        <View style={[styles.podiumItem, { height }]}>
            <UserAvatar size={user.position === 1 ? 70 : 60} />
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userPoints}>{user.points} points</Text>
            <View style={[styles.podiumBase, { height }]}>
                <Text style={styles.positionNumber}>{user.position}</Text>
            </View>
        </View>
    );

    const ListItem: React.FC<{ user: User }> = ({ user }) => (
        <View style={styles.listItem}>
            <View style={styles.positionCircle}>
                <Text style={styles.positionText}>{user.position}</Text>
            </View>
            <UserAvatar size={50} />
            <View style={styles.userInfo}>
                <Text style={styles.listUserName}>{user.name}</Text>
                <Text style={styles.listUserPoints}>{user.points} points</Text>
            </View>
        </View>
    );


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.toggleContainer}>
                    <TouchableOpacity
                        style={[
                            styles.toggleButton,
                            selectedPeriod === 'Tygodniowe' && styles.toggleButtonActive,
                        ]}
                        onPress={() => setSelectedPeriod('Tygodniowe')}
                    >
                        <Text
                            style={[
                                styles.toggleText,
                                selectedPeriod === 'Tygodniowe' && styles.toggleTextActive,
                            ]}
                        >
                            Tygodniowe
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.toggleButton,
                            selectedPeriod === 'Ogólne' && styles.toggleButtonActive,
                        ]}
                        onPress={() => setSelectedPeriod('Ogólne')}
                    >
                        <Text
                            style={[
                                styles.toggleText,
                                selectedPeriod === 'Ogólne' && styles.toggleTextActive,
                            ]}
                        >
                            Ogólne
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.podiumContainer}>
                    {topUsers[0] && <PodiumItem user={topUsers[0]} height={120} />}
                    {topUsers[1] && <PodiumItem user={topUsers[1]} height={150} />}
                    {topUsers[2] && <PodiumItem user={topUsers[2]} height={100} />}
                </View>

                <View style={styles.listContainer}>
                    {otherUsers.map((user) => (
                        <ListItem key={user.id} user={user} />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f8f9fa',
    },
    content: {
        paddingHorizontal: 20,
    },
    toggleContainer: {
        flexDirection: 'row',
        backgroundColor: '#e9ecef',
        borderRadius: 25,
        padding: 4,
        marginBottom: 30,
    },
    toggleButton: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignItems: 'center',
    },
    toggleButtonActive: {
        backgroundColor: '#6f42c1',
    },
    toggleText: {
        color: '#6c757d',
        fontWeight: '500',
    },
    toggleTextActive: {
        color: '#fff',
    },
    podiumContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginBottom: 30,
        paddingHorizontal: 10,
    },
    podiumItem: {
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 5,
    },
    podiumBase: {
        backgroundColor: '#e9ecef',
        width: '100%',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    positionNumber: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#000',
    },
    avatar: {
        backgroundColor: '#e9ecef',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    avatarIcon: {
        alignItems: 'center',
    },
    head: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#adb5bd',
        marginBottom: 2,
    },
    body: {
        width: 20,
        height: 12,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: '#adb5bd',
    },
    userName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
        textAlign: 'center',
        marginBottom: 2,
    },
    userPoints: {
        fontSize: 12,
        color: '#6c757d',
        textAlign: 'center',
    },
    listContainer: {
        gap: 15,
        paddingBottom: 20,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    positionCircle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#e9ecef',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    positionText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    userInfo: {
        marginLeft: 15,
        flex: 1,
    },
    listUserName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        marginBottom: 2,
    },
    listUserPoints: {
        fontSize: 14,
        color: '#6c757d',
    },
});

export default RankingScreen;
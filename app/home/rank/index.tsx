import { useRankingQuery } from '@/api/__generated__/graphql';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type User = {
    id: number;
    uri?: string | null;
    name: string;
    points: number;
    position: number;
};

const useRanking = (mode: 'Tygodniowe' | 'Ogólne') => {
    const { data, refetch } = useRankingQuery({
        variables: {
            input: {
                limit: 10,
            },
        },
        fetchPolicy: 'cache-first',
    });

    useEffect(() => {
        refetch({
            input: {
                startDate: mode === 'Tygodniowe' ? new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) : null,
                endDate: mode === 'Tygodniowe' ? new Date() : null,
                limit: 10,
            },
        });
    }, [mode, refetch]);

    return data?.leaderboard?.map((user, index) => ({
        id: user.id,
        uri: user.avatarUrl ?? null,
        name: `${user.firstname} ${user.lastname}`,
        points: user.totalPoints,
        position: index + 1,
    })) || [];
}

const RankingScreen: React.FC = () => {
    const [selectedPeriod, setSelectedPeriod] = useState<'Tygodniowe' | 'Ogólne'>('Tygodniowe');

    const ranking = useRanking(selectedPeriod);

    const topUsers = ranking.slice(0, 3);
    const otherUsers = ranking.slice(3);

    console.log({ topUsers, otherUsers, selectedPeriod });

    const UserAvatar: React.FC<{ size?: number; uri?: string | null }> = ({ size = 60, uri }) => (
        <View style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}>
            {uri ? (
                <Image
                    source={{ uri }}
                    style={{ width: size, height: size, borderRadius: size / 2 }}
                />
            ) : (
                <View style={styles.avatarIcon}>
                    <View style={styles.head} />
                    <View style={styles.body} />
                </View>
            )}
        </View>
    );

    const PodiumUser: React.FC<{ user: User; position: number }> = ({ user, position }) => {
        const getTopPosition = () => {
            switch (position) {
                case 1: return 0;
                case 2: return 50;
                case 3: return 75;
                default: return 0;
            }
        };

        const getAvatarSize = () => {
            return position === 1 ? 80 : 65;
        };

        const getHorizontalPosition = () => {
            switch (position) {
                case 1: return '50%';
                case 2: return '15%';
                case 3: return '78%';
                default: return '50%';
            }
        };

        return (
            <View style={[
                styles.podiumUser,
                {
                    top: getTopPosition(),
                    left: getHorizontalPosition(),
                    transform: [{ translateX: position === 1 ? -40 : position === 2 ? -32.5 : -32.5 }]
                }
            ]}>
                <UserAvatar size={getAvatarSize()} uri={user.uri} />
                <Text style={styles.podiumUserName}>{user.name}</Text>
                <Text style={styles.podiumUserPoints}>{user.points} punktów</Text>
            </View>
        );
    };

    const ListItem: React.FC<{ user: User }> = ({ user }) => (
        <View style={styles.listItem}>
            <View style={styles.positionCircle}>
                <Text style={styles.positionText}>{user.position}</Text>
            </View>
            <UserAvatar size={50} uri={user.uri} />
            <View style={styles.userInfo}>
                <Text style={styles.listUserName}>{user.name}</Text>
            </View>
            <View style={styles.pointsInfo}>
                <Text style={styles.listUserPoints}>{user.points} pkt</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container} >
            <StatusBar barStyle="dark-content" />
            <LinearGradient
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                colors={['#eeeeee', '#d1e8b0']}
                style={{ flex: 1 }}
            >
                <View style={styles.toggleContainer}>
                    <View style={styles.toggleBorder}>
                        <TouchableOpacity
                            style={[
                                styles.toggleButton,
                                styles.toggleButtonLeft,
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
                                styles.toggleButtonRight,
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
                </View>
                <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                    <View style={styles.podiumSection}>
                        <View style={styles.podiumContainer}>
                            {topUsers.map((user) => (
                                <PodiumUser key={user.id} user={user} position={user.position} />
                            ))}
                        </View>
                        <Image
                            source={require('../../../assets/images/podium.png')}
                            style={styles.podiumImage}
                            contentFit="contain"
                        />
                    </View>

                    <View style={styles.listContainer}>
                        <View style={styles.listItems}>
                            {otherUsers.map((user) => (
                                <ListItem key={user.id} user={user} />
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        paddingVertical: 19,
    },
    toggleContainer: {
        backgroundColor: '#fff',
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        paddingHorizontal: 9,
        paddingVertical: 19,
    },
    toggleBorder: {
        flexDirection: 'row',
        borderRadius: 25,
    },
    toggleButton: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 20,
        alignItems: 'center',
        borderWidth: 2,
    },
    toggleButtonLeft: {
        borderTopLeftRadius: 21,
        borderBottomLeftRadius: 21,
        borderRightWidth: 0,
    },
    toggleButtonRight: {
        borderTopRightRadius: 21,
        borderBottomRightRadius: 21,
        borderLeftWidth: 0
    },
    toggleButtonActive: {
        borderColor: '#437454',
        backgroundColor: '#CDE5D5',
    },
    toggleText: {
        color: '#666',
        fontWeight: '600',
        fontSize: 16,
    },
    toggleTextActive: {
        color: '#437454',
    },
    podiumSection: {
        height: 320,
    },
    podiumContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
    },
    podiumUser: {
        position: 'absolute',
        alignItems: 'center',
    },
    podiumUserName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 4,
    },
    podiumUserPoints: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
    podiumImage: {
        width: null,
        height: 240,
        resizeMode: 'cover',
        marginHorizontal: 16,
        marginTop: 120
    },
    avatar: {
        backgroundColor: '#e9ecef',
        justifyContent: 'center',
        alignItems: 'center',
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
    listContainer: {
        paddingBottom: 80,
    },
    listItems: {
        gap: 12,
        backgroundColor: '#fff',
        padding: 12,
        marginHorizontal: 8,
        borderRadius: 16,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    positionCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#437454',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    positionText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    userInfo: {
        marginLeft: 12,
        flex: 1,
    },
    pointsInfo: {
    },
    listUserName: {
        fontSize: 16,
        fontWeight: 500,
        color: '#21252B',
    },
    listUserPoints: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#21252B',
    },
});

export default RankingScreen;

import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Ionicons, Octicons} from '@expo/vector-icons';
import {router} from 'expo-router';

const ProfileScreen: React.FC = () => {
    const user = {
        name: 'Jan Kowalski',
        username: '@jankowalski',
        bio: 'Pasjonat ekologii i ochrony środowiska. Lubię spędzać czas na świeżym powietrzu i dbać o naszą planetę.',
        stats: {
            activities: 24,
            points: 1250,
            rank: 5,
            trash: 156
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <Ionicons name="arrow-back" size={24} color="#000"/>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Profil</Text>
                    <View style={styles.headerRight}/>
                </View>

                <View style={styles.profileSection}>
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatar}>
                            <View style={styles.avatarIcon}>
                                <View style={styles.head}/>
                                <View style={styles.body}/>
                            </View>
                        </View>
                    </View>

                    <Text style={styles.userName}>{user.name}</Text>
                    <Text style={styles.userHandle}>{user.username}</Text>
                    <Text style={styles.userBio}>{user.bio}</Text>

                    <TouchableOpacity style={styles.editButton}>
                        <Text style={styles.editButtonText}>Edytuj profil</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{user.stats.activities}</Text>
                        <Text style={styles.statLabel}>Aktywności</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{user.stats.points}</Text>
                        <Text style={styles.statLabel}>Punkty</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>#{user.stats.rank}</Text>
                        <Text style={styles.statLabel}>Ranking</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{user.stats.trash}</Text>
                        <Text style={styles.statLabel}>Śmieci</Text>
                    </View>
                </View>

                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Ostatnie aktywności</Text>

                    <View style={styles.activityCard}>
                        <View style={styles.activityHeader}>
                            <View style={styles.activityType}>
                                <Octicons name="trash" size={16} color="#fff"/>
                            </View>
                            <Text style={styles.activityDate}>24 kwietnia 2023</Text>
                        </View>
                        <Text style={styles.activityTitle}>Sprzątanie parku miejskiego</Text>
                        <View style={styles.activityStats}>
                            <View style={styles.activityStat}>
                                <Ionicons name="time-outline" size={16} color="#6c757d"/>
                                <Text style={styles.activityStatText}>01:45:30</Text>
                            </View>
                            <View style={styles.activityStat}>
                                <Ionicons name="walk-outline" size={16} color="#6c757d"/>
                                <Text style={styles.activityStatText}>2.5 km</Text>
                            </View>
                            <View style={styles.activityStat}>
                                <Octicons name="trash" size={16} color="#6c757d"/>
                                <Text style={styles.activityStatText}>23</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.activityCard}>
                        <View style={styles.activityHeader}>
                            <View style={[styles.activityType, {backgroundColor: '#28a745'}]}>
                                <Ionicons name="leaf" size={16} color="#fff"/>
                            </View>
                            <Text style={styles.activityDate}>18 kwietnia 2023</Text>
                        </View>
                        <Text style={styles.activityTitle}>Sadzenie drzew w lesie miejskim</Text>
                        <View style={styles.activityStats}>
                            <View style={styles.activityStat}>
                                <Ionicons name="time-outline" size={16} color="#6c757d"/>
                                <Text style={styles.activityStatText}>02:30:15</Text>
                            </View>
                            <View style={styles.activityStat}>
                                <Ionicons name="walk-outline" size={16} color="#6c757d"/>
                                <Text style={styles.activityStatText}>1.8 km</Text>
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.viewAllButton}>
                        <Text style={styles.viewAllButtonText}>Zobacz wszystkie</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Osiągnięcia</Text>

                    <View style={styles.achievementsContainer}>
                        <View style={styles.achievementItem}>
                            <View style={styles.achievementIcon}>
                                <Octicons name="star-fill" size={24} color="#ffc107"/>
                            </View>
                            <Text style={styles.achievementName}>Początkujący</Text>
                        </View>

                        <View style={styles.achievementItem}>
                            <View style={styles.achievementIcon}>
                                <Octicons name="flame" size={24} color="#fd7e14"/>
                            </View>
                            <Text style={styles.achievementName}>Zapaleńiec</Text>
                        </View>

                        <View style={styles.achievementItem}>
                            <View style={styles.achievementIcon}>
                                <Octicons name="heart-fill" size={24} color="#dc3545"/>
                            </View>
                            <Text style={styles.achievementName}>Ekolog</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.viewAllButton}>
                        <Text style={styles.viewAllButtonText}>Zobacz wszystkie</Text>
                    </TouchableOpacity>
                </View>

                <View style={{height: 40}}/>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    scrollView: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef',
    },
    backButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
    },
    headerRight: {
        width: 40,
    },
    profileSection: {
        alignItems: 'center',
        paddingVertical: 30,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    avatarContainer: {
        marginBottom: 15,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#e9ecef',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarIcon: {
        alignItems: 'center',
    },
    head: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#adb5bd',
        marginBottom: 4,
    },
    body: {
        width: 36,
        height: 24,
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        backgroundColor: '#adb5bd',
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 5,
    },
    userHandle: {
        fontSize: 16,
        color: '#6c757d',
        marginBottom: 15,
    },
    userBio: {
        fontSize: 14,
        color: '#495057',
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 20,
    },
    editButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#6f42c1',
        borderRadius: 20,
    },
    editButtonText: {
        color: '#fff',
        fontWeight: '500',
    },
    statsContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginTop: 1,
        paddingVertical: 20,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 5,
    },
    statLabel: {
        fontSize: 12,
        color: '#6c757d',
    },
    sectionContainer: {
        backgroundColor: '#fff',
        marginTop: 15,
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
        marginBottom: 15,
    },
    activityCard: {
        backgroundColor: '#f8f9fa',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
    },
    activityHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    activityType: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#dc3545',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    activityDate: {
        fontSize: 12,
        color: '#6c757d',
    },
    activityTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        marginBottom: 10,
    },
    activityStats: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    activityStat: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    activityStatText: {
        fontSize: 12,
        color: '#6c757d',
        marginLeft: 5,
    },
    viewAllButton: {
        alignItems: 'center',
        paddingVertical: 10,
    },
    viewAllButtonText: {
        color: '#6f42c1',
        fontWeight: '500',
    },
    achievementsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 15,
    },
    achievementItem: {
        width: '33%',
        alignItems: 'center',
        marginBottom: 15,
    },
    achievementIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#f8f9fa',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    achievementName: {
        fontSize: 12,
        color: '#495057',
        textAlign: 'center',
    },
});

export default ProfileScreen;
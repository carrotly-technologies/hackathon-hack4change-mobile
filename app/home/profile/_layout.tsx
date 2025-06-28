import React, {useState} from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import CarrotCoin from "@/components/svg/CarrotCoin";
import {Ionicons} from "@expo/vector-icons";
import {useActivityStore} from "@/store/activity.store";
import ProfileScreen from "@/app/home/profile/index";
import ProfileActivities from "@/app/home/profile/activities";

const ProfileLayout = () => {
    const {user} = useActivityStore();
    const [activeTab, setActiveTab] = useState('profile');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'profile':
                return (
                    <View style={styles.tabContent}>
                        <ProfileScreen/>
                    </View>
                );
            case 'activities':
                return (
                    <View style={styles.tabContent}>
                        <ProfileActivities/>
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.profileSection}>
                    <Image
                        source={{
                            uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
                        }}
                        style={styles.profileImage}
                    />
                    <View style={styles.profileInfo}>
                        <Text style={styles.name}>{user?.firstname} {user?.lastname}</Text>
                        <View style={styles.coinsContainer}>
                            <CarrotCoin width={20} height={20}/>
                            <Text style={styles.coinsText}>{user?.coins} coins</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={styles.settingsButton}>
                    <Ionicons name="settings-outline" size={24} color="#666"/>
                </TouchableOpacity>
            </View>

            <View style={styles.tabBar}>
                <TouchableOpacity
                    style={[
                        styles.tabButton,
                        activeTab === 'profile' && styles.activeTabButton
                    ]}
                    onPress={() => setActiveTab('profile')}
                >
                    <Text style={[
                        styles.tabText,
                        activeTab === 'profile' && styles.activeTabText
                    ]}>
                        Profil
                    </Text>
                    {activeTab === 'profile' && <View style={styles.tabIndicator}/>}
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.tabButton,
                        activeTab === 'activities' && styles.activeTabButton,
                    ]}
                    onPress={() => setActiveTab('activities')}
                >
                    <Text style={[
                        styles.tabText,
                        activeTab === 'activities' && styles.activeTabText
                    ]}>
                        Moje aktywności
                    </Text>
                    {activeTab === 'activities' && <View style={styles.tabIndicator}/>}
                </TouchableOpacity>
            </View>

            {renderTabContent()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D1E8B0',
    },
    coinsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    header: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingTop: 55,
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
    coinsText: {
        fontSize: 14,
        color: '#4CAF50',
        marginLeft: 4,
        fontWeight: '500',
    },
    settingsButton: {
        padding: 8,
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
    tabBar: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    tabButton: {
        flex: 1,
        paddingVertical: 16,
        paddingHorizontal: 12,
        alignItems: 'center',
        position: 'relative',
        borderBottomWidth: 2,
        borderBottomColor: '#437454',
    },
    activeTabButton: {
        borderBottomWidth: 3,
        borderBottomColor: '#437454',
    },
    tabText: {
        fontSize: 16,
        color: '#666',
        fontWeight: '500',
    },
    activeTabText: {
        color: '#437454',
        fontWeight: '600',
    },
    tabIndicator: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 3,
        backgroundColor: '#437454',
    },
    tabContent: {
        flex: 1,
    },
});

export default ProfileLayout;
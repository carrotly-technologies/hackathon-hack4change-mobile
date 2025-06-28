import { EventObject, Sort, useEventsQuery } from '@/api/__generated__/graphql';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { format } from 'date-fns';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef, useState } from 'react';
import { Animated, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ScheduleApp = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [distanceRange, setDistanceRange] = useState(55);
    const [environmentalFilter, setEnvironmentalFilter] = useState(true);
    const [socialFilter, setSocialFilter] = useState(true);

    const slideAnimation = useRef(new Animated.Value(0));
    const toggleWidth = useRef(0);

    const [mode, setMode] = useState<'Wydarzenia' | 'Wyzwania'>('Wydarzenia');

    const monthNames = [
        'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
        'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'
    ];

    const dayNames = ['Pon', 'Wto', 'Śro', 'Czw', 'Pią', 'Sob', 'Nie'];

    const getWeekDates = () => {
        const startOfWeek = new Date(selectedDate);
        const day = startOfWeek.getDay();
        const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Monday as first day
        startOfWeek.setDate(diff);

        const weekDates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);

            const today = new Date();
            const isToday = date.toDateString() === today.toDateString();
            const isSelected = date.toDateString() === selectedDate.toDateString();

            weekDates.push({
                day: dayNames[i],
                date: date.getDate(),
                fullDate: new Date(date),
                isToday,
                isSelected,
            });
        }
        return weekDates;
    };

    const navigateWeek = (direction: any) => {
        const newDate = new Date(selectedDate);
        newDate.setDate(selectedDate.getDate() + (direction * 7));
        setSelectedDate(newDate);
        setCurrentDate(newDate);
    };

    const selectDate = (dateObj: any) => {
        setSelectedDate(dateObj.fullDate);
        setCurrentDate(dateObj.fullDate);
    };

    const weekDates = getWeekDates();

    const { data } = useEventsQuery({
        variables: {
            pagination: {},
            input: {
                date: format(selectedDate, 'yyyy-MM-dd'),
            },
            sort: {
                eventType: { direction: Sort.Desc }
            }
        },
    });

    const handleTogglePress = (mode: 'Wydarzenia' | 'Wyzwania') => {
        setMode(mode);
        if (toggleWidth.current > 0) {
            const slidePosition = mode === 'Wydarzenia' ? 0 : toggleWidth.current / 2;

            Animated.timing(slideAnimation.current, {
                toValue: slidePosition,
                duration: 200,
                useNativeDriver: false,
            }).start();
        }
    };

    const renderDayItem = (item: any, index: number) => (
        <TouchableOpacity
            key={index}
            style={[
                styles.dayItem,
                item.isToday && styles.todayItem,
                item.isSelected && styles.selectedItem
            ]}
            onPress={() => selectDate(item)}
        >
            <Text style={[
                styles.dayText,
                (item.isToday) && styles.todayText,
                (item.isToday || item.isSelected) && styles.highlightedText
            ]}>
                {item.day}
            </Text>
            <Text style={[
                styles.dateText,
                (item.isToday) && styles.todayText,
                (item.isToday || item.isSelected) && styles.highlightedText
            ]}>
                {item.date}
            </Text>
        </TouchableOpacity>
    );

    const renderEventItem = (event: EventObject) => (
        <View key={event.id} style={styles.eventItem}>
            <View style={styles.eventIconContainer}>
                <Image source={{ uri: event.imageUrl || 'https://via.placeholder.com/40' }} style={styles.eventIcon} />
            </View>
            <View style={styles.eventContent}>
                <Text style={styles.eventTitle}>{event.name}</Text>
                <Text style={styles.eventLocation}>{event.place}</Text>
            </View>
        </View>
    );

    const renderFilterModal = () => (
        <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Filtry wyszukiwania</Text>
                </View>

                <View style={styles.filterSection}>
                    <View style={styles.distanceHeader}>
                        <Text style={styles.filterLabel}>Zasięg od mojej lokalizacji</Text>
                        <Text style={styles.distanceValue}>{Math.floor(distanceRange)}km</Text>
                    </View>
                    <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={100}
                        value={distanceRange}
                        onValueChange={setDistanceRange}
                        minimumTrackTintColor="#6366f1"
                        maximumTrackTintColor="#e5e7eb"
                    />
                    <View style={styles.distanceLabels}>
                        <Text style={styles.distanceLabel}>0km</Text>
                        <Text style={styles.distanceLabel}>100km</Text>
                    </View>
                </View>

                <View style={styles.filterSection}>
                    <Text style={styles.filterLabel}>Typ wydarzeń</Text>

                    <TouchableOpacity
                        style={styles.toggleRow}
                        onPress={() => setEnvironmentalFilter(!environmentalFilter)}
                    >
                        <View style={[styles.toggle, environmentalFilter && styles.toggleActive]}>
                            <View style={[styles.toggleThumb, environmentalFilter && styles.toggleThumbActive]} />
                        </View>
                        <Text style={styles.toggleLabel}>Wydarzenie ekologiczne</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.toggleRow}
                        onPress={() => setSocialFilter(!socialFilter)}
                    >
                        <View style={[styles.toggle, socialFilter && styles.toggleActive]}>
                            <View style={[styles.toggleThumb, socialFilter && styles.toggleThumbActive]} />
                        </View>
                        <Text style={styles.toggleLabel}>Wydarzenie społeczne</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.searchButton}
                    onPress={() => {
                        setFilterModalVisible(false);
                        // Apply filters here
                    }}
                >
                    <Text style={styles.searchButtonText}>Wyszukaj</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <LinearGradient
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                colors={['#eeeeee', '#d1e8b0']}
                style={{ flex: 1 }}
            >
                <View style={styles.toggleContainer}>
                    <View
                        style={styles.toggleBorder}
                        onLayout={(event) => {
                            const { width } = event.nativeEvent.layout;
                            toggleWidth.current = width;

                            if (mode === 'Wyzwania') {
                                slideAnimation.current.setValue(width / 2);
                            }
                        }}
                    >
                        <Animated.View
                            style={[
                                styles.slidingBackground,
                                {
                                    transform: [{ translateX: slideAnimation.current }],
                                    width: toggleWidth.current > 0 ? toggleWidth.current / 2 : '50%',
                                }
                            ]}
                        />
                        <TouchableOpacity
                            style={[styles.toggleButton, styles.toggleButtonLeft]}
                            onPress={() => handleTogglePress('Wydarzenia')}
                        >
                            <Text
                                style={[
                                    styles.toggleText,
                                    mode === 'Wydarzenia' && styles.toggleTextActive,
                                ]}
                            >
                                Wydarzenia
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.toggleButton, styles.toggleButtonRight]}
                            onPress={() => handleTogglePress('Wyzwania')}
                        >
                            <Text
                                style={[
                                    styles.toggleText,
                                    mode === 'Wyzwania' && styles.toggleTextActive,
                                ]}
                            >
                                Wyzwania
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <View style={styles.calendar}>
                        <View style={styles.header}>
                            <View style={{ width: 32 }} />
                            <Text style={styles.monthTitle}>
                                {monthNames[currentDate.getMonth()]}
                            </Text>
                            <Pressable onPress={() => setFilterModalVisible((v) => !v)}>
                                <View style={{ width: 32, flexDirection: 'row', justifyContent: 'center' }}>
                                    <Ionicons name="filter-circle-outline" size={32} />
                                </View>
                            </Pressable>
                        </View>

                        <View style={styles.weekContainer}>
                            {weekDates.map((item, index) => renderDayItem(item, index))}
                        </View>

                        <View style={styles.divider} />
                    </View>

                    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                        <View style={styles.eventsContainer}>
                            {data?.events.data?.map(renderEventItem)}
                        </View>
                    </ScrollView>
                    {filterModalVisible && renderFilterModal()}
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollView: {
        flex: 1,
        paddingVertical: 19
    },
    calendar: {
        backgroundColor: '#fff',
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    navButton: {
        padding: 10,
        minWidth: 40,
        alignItems: 'center',
    },
    navButtonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    monthTitle: {
        fontSize: 24,
        fontWeight: '900',
        color: '#000',
        flex: 1,
        textAlign: 'center',
    },
    weekContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    dayItem: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 45,
        height: 60,
        borderRadius: 8,
        backgroundColor: 'transparent',
    },
    todayItem: {
        backgroundColor: '#437454',
    },
    selectedItem: {
        backgroundColor: '#e6ecdd',
    },
    dayText: {
        fontSize: 14,
        color: '#26262',
        marginBottom: 4,
    },
    dateText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
    },
    todayText: {
        color: '#fff',
    },
    highlightedText: {
        fontWeight: 'bold',
        color: '#262626',
    },
    divider: {
        width: 80,
        height: 2,
        backgroundColor: '#437454',
        marginHorizontal: 'auto',
        marginBottom: 20,
    },
    eventsContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    eventItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderLeftWidth: 4,
        borderLeftColor: '#437454',
    },
    eventIconContainer: {
        marginRight: 12,
    },
    eventIcon: {
        width: 40,
        height: 40,
        backgroundColor: '#d0d0d0',
        borderRadius: 8,
        borderColor: '#bbb',
    },
    eventContent: {
        flex: 1,
        marginRight: 12,
    },
    eventTitle: {
        fontSize: 16,
        fontWeight: '900',
        color: '#262626',
        marginBottom: 4,
    },
    eventLocation: {
        fontSize: 12,
        color: '#262626',
    },
    modalOverlay: {
        justifyContent: 'flex-end',
        position: 'absolute',
        width: '100%',
        marginTop: 76,
    },
    modalContent: {
        backgroundColor: '#f3f3f3',
        padding: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 15,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    closeButton: {
        padding: 5,
    },
    closeButtonText: {
        fontSize: 18,
        color: '#666',
    },
    filterSection: {
        marginBottom: 25,
    },
    filterLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 15,
    },
    distanceHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    distanceValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#6366f1',
    },
    slider: {
        width: '100%',
        height: 40,
    },
    sliderThumb: {
        backgroundColor: '#6366f1',
        width: 20,
        height: 20,
    },
    distanceLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    distanceLabel: {
        fontSize: 12,
        color: '#666',
    },
    toggleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    toggle: {
        width: 50,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#e5e7eb',
        marginRight: 12,
        justifyContent: 'center',
        padding: 2,
    },
    toggleActive: {
        backgroundColor: '#6366f1',
    },
    toggleThumb: {
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: '#fff',
        alignSelf: 'flex-start',
    },
    toggleThumbActive: {
        alignSelf: 'flex-end',
    },
    toggleLabel: {
        fontSize: 16,
        color: '#333',
    },
    searchButton: {
        backgroundColor: '#6366f1',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        marginTop: 10,
    },
    searchButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    toggleContainer: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.1,
        zIndex: 10,
    },
    toggleBorder: {
        paddingTop: 25,
        paddingBottom: 12,
        flexDirection: 'row',
        position: 'relative',
        backgroundColor: '#fff',
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
    },
    slidingBackground: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 6,
        backgroundColor: '#437454',
        zIndex: 1,
    },
    toggleButton: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 20,
        alignItems: 'center',
        zIndex: 1,
    },
    toggleButtonLeft: {
    },
    toggleButtonRight: {
    },
    toggleText: {
        color: '#666',
        fontWeight: '600',
        fontSize: 16,
    },
    toggleTextActive: {
        color: '#000',
        fontWeight: 'bold',
    },
});

export default ScheduleApp;

// Environmental cleanup/nature events
// https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=150&h=150&fit=crop&crop=center
// https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=150&h=150&fit=crop&crop=center
// https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=150&h=150&fit=crop&crop=center
// https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=150&h=150&fit=crop&crop=center
// https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=150&h=150&fit=crop&crop=center
// https://images.unsplash.com/photo-1563453392212-326f5e854473?w=150&h=150&fit=crop&crop=center

// Tree planting/gardening
// https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=150&h=150&fit=crop&crop=center
// https://images.unsplash.com/photo-1515023115689-589c33041d3c?w=150&h=150&fit=crop&crop=center
// https://images.unsplash.com/photo-1574263867128-a3d5c1b1debc?w=150&h=150&fit=crop&crop=center

// Recycling/sustainability
// https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=150&h=150&fit=crop&crop=center
// https://images.unsplash.com/photo-1502780402662-acc01917406e?w=150&h=150&fit=crop&crop=center
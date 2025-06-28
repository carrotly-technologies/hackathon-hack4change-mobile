import { EventObject, Sort, useEventsQuery } from '@/api/__generated__/graphql';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { format } from 'date-fns';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ScheduleApp = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [distanceRange, setDistanceRange] = useState(55);
    const [environmentalFilter, setEnvironmentalFilter] = useState(true);
    const [socialFilter, setSocialFilter] = useState(true);

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
                (item.isToday || item.isSelected) && styles.highlightedText
            ]}>
                {item.day}
            </Text>
            <Text style={[
                styles.dateText,
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
            <View style={{ flex: 1 }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottomWidth: 1,
                    borderBottomColor: '#e0e0e0',
                    paddingHorizontal: 16,
                    height: 76,
                }}>
                    <View style={{ width: 32 }} />
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333', textAlign: 'center', flex: 1 }}>
                        Nadchodzące wydarzenia
                    </Text>
                    <Pressable onPress={() => setFilterModalVisible((v) => !v)}>
                        <View style={{ width: 32, flexDirection: 'row', justifyContent: 'center' }}>
                            <Ionicons name="filter-circle-outline" size={32} />
                        </View>
                    </Pressable>
                </View>

                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => {
                            navigateWeek(-1);
                            setFilterModalVisible((v) => !v);
                        }} style={styles.navButton}>
                            <Text style={styles.navButtonText}>←</Text>
                        </TouchableOpacity>
                        <Text style={styles.monthTitle}>
                            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                        </Text>
                        <TouchableOpacity onPress={() => navigateWeek(1)} style={styles.navButton}>
                            <Text style={styles.navButtonText}>→</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.weekContainer}>
                        {weekDates.map((item, index) => renderDayItem(item, index))}
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.eventsContainer}>
                        {data?.events.data?.map(renderEventItem)}
                    </View>
                </ScrollView>
                {filterModalVisible && renderFilterModal()}
            </View>
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
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
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
        backgroundColor: '#4a90e2',
    },
    selectedItem: {
        backgroundColor: '#e0e0e0',
    },
    dayText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    dateText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    highlightedText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    divider: {
        height: 2,
        backgroundColor: '#333',
        marginHorizontal: 100,
        marginBottom: 20,
    },
    eventsContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    eventItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e8e8e8',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderLeftWidth: 4,
        borderLeftColor: '#333',
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
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    eventLocation: {
        fontSize: 14,
        color: '#666',
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
});

export default ScheduleApp;
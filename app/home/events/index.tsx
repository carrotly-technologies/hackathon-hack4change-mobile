import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';

const ScheduleApp = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

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

    const events = [
        {
            id: 1,
            title: 'Wydarzenie 1',
            location: 'Lokalizacja',
            startTime: '9:00',
            endTime: null,
        },
        {
            id: 2,
            title: 'Wydarzenie 2',
            location: 'Lokalizacja',
            startTime: '9:00',
            endTime: '17:00',
        },
        {
            id: 3,
            title: 'Wydarzenie 3',
            location: 'Lokalizacja',
            startTime: '9:00',
            endTime: '17:00',
        },
    ];

    const renderDayItem = (item: any, index: any) => (
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

    const renderEventItem = (event: any) => (
        <View key={event.id} style={styles.eventItem}>
            <View style={styles.eventIconContainer}>
                <View style={styles.eventIcon}/>
            </View>
            <View style={styles.eventContent}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventLocation}>{event.location}</Text>
            </View>
            <View style={styles.eventTimeContainer}>
                <Text style={styles.eventTime}>{event.startTime}</Text>
                {event.endTime && (
                    <Text style={styles.eventEndTime}>do {event.endTime}</Text>
                )}
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5"/>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigateWeek(-1)} style={styles.navButton}>
                        <Text style={styles.navButtonText}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.monthTitle}>
                        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </Text>
                    <TouchableOpacity onPress={() => navigateWeek(1)} style={styles.navButton}>
                        <Text style={styles.navButtonText}>→</Text>
                    </TouchableOpacity>
                </View>

                {/* Week Days */}
                <View style={styles.weekContainer}>
                    {weekDates.map((item, index) => renderDayItem(item, index))}
                </View>

                {/* Divider */}
                <View style={styles.divider}/>

                {/* Events List */}
                <View style={styles.eventsContainer}>
                    {events.map(renderEventItem)}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
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
        borderWidth: 2,
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
    eventTimeContainer: {
        alignItems: 'flex-end',
    },
    eventTime: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    eventEndTime: {
        fontSize: 12,
        color: '#666',
        marginTop: 2,
    },
});

export default ScheduleApp;
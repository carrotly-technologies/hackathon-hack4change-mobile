import { EventObject, Sort, useEventsQuery } from '@/api/__generated__/graphql';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { format } from 'date-fns';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React, { PropsWithChildren, useRef, useState } from 'react';
import { Animated, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

const Coin = ({ size }: { size: number }) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Circle cx="13.5" cy="13" r="12.5" fill="#C5F1D4" stroke="#157234" strokeWidth="0.86" />
            <Path d="M17.21 20.9232C16.1534 21.4704 10.2291 14.6958 9.85176 12.5574C9.71648 11.7909 9.66309 11.0193 10.38 10.4941C10.38 10.4941 7.43673 9.66876 6.71979 8.99349C6.00286 8.31822 6.1915 6.46125 7.43672 6.66757C8.68194 6.87389 9.96496 8.86159 10.1914 8.69337C10.4178 8.52515 9.54987 7.11774 9.54987 5.54212C9.54987 3.96649 11.3234 3.92896 11.8894 5.12945C12.4554 6.32994 11.8894 9.88652 11.8894 9.88652C12.64 9.68084 13.448 9.73994 14.0403 10.1564C15.5874 11.2444 18.2665 20.3761 17.21 20.9232Z" fill="#C5F1D4" />
            <Path d="M10.38 10.4941C9.66309 11.0193 9.71648 11.7909 9.85176 12.5574C10.2291 14.6958 16.1534 21.4704 17.21 20.9232C18.2665 20.3761 15.5874 11.2444 14.0403 10.1564C13.448 9.73994 12.64 9.68084 11.8894 9.88652M10.38 10.4941C10.38 10.4941 7.43673 9.66876 6.71979 8.99349C6.00286 8.31822 6.1915 6.46125 7.43672 6.66757C8.68194 6.87389 9.96496 8.86159 10.1914 8.69337C10.4178 8.52515 9.54987 7.11774 9.54987 5.54212C9.54987 3.96649 11.3234 3.92896 11.8894 5.12945C12.4554 6.32994 11.8894 9.88652 11.8894 9.88652M10.38 10.4941C10.7951 10.0881 11.3823 10.0255 11.8894 9.88652" stroke="#157234" strokeWidth="0.86" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
    );
}

const Chart = ({ progress, size }: { progress: number, size: number }) => {
    const strokeWidth = 6;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <View style={{
            width: size,
            height: size,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Svg width={size} height={size} style={{ transform: [{ rotate: '-90deg' }] }}>
                <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="#e0e0e0"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                />
                <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="#437454"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                />
            </Svg>
        </View>
    );
}

const Challenge = ({
    title,
    subtitle,
    remaining,
    coins,
    progress,
    feat
}: {
    title: string,
    subtitle: string,
    remaining: string,
    coins: number,
    progress: number,
    feat?: string
}) => {
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
        }}>
            <View style={{
                alignItems: 'center',
            }}>
                <Chart progress={progress} size={48} />
            </View>
            <View style={{ flex: 1, marginLeft: 20 }}>
                <Text style={{
                    display: feat ? 'flex' : 'none',
                    color: '#A5A5A5',
                    marginBottom: 8,
                }}>{feat}</Text>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 8
                }}>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: '#333',
                        flex: 1
                    }}>
                        {title}
                    </Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#333',
                            marginRight: 8
                        }}>
                            {coins > 0 ? `+${coins}` : ''}
                        </Text>
                        <Coin size={32} />
                    </View>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    <Text style={{
                        fontSize: 14,
                        color: '#666',
                        marginBottom: 8
                    }}>
                        {subtitle}
                    </Text>
                    <Text style={{
                        fontSize: 12,
                        color: '#999'
                    }}>
                        {remaining}
                    </Text>
                </View>
            </View>
        </View>
    )
}

const Card = ({
    title,
    children
}: PropsWithChildren<{
    title: string
}>) => {
    return (
        <View style={{
            backgroundColor: '#fff',
            borderRadius: 16,
            padding: 20,
            marginBottom: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3
        }}>
            <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: '#333',
                marginBottom: 20
            }}>
                {title}
            </Text>

            {children}
        </View>
    );
}

const Challanges = () => {
    return (
        <View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 19 }}>
            <Card title='Twoj wyzwania'>
                <Challenge
                    title="Przejdź 15 km rowerem w tygodniu"
                    subtitle="6/15 km"
                    remaining="3 dni do końca"
                    coins={45}
                    progress={40}
                />
                <Challenge
                    title="Zrób 12 000 kroków codziennie"
                    subtitle="0/12000 kroków"
                    remaining="13 godzin do końca"
                    coins={60}
                    progress={0}
                />
            </Card>

            <Card title='Wyzwania partnerskie'>
                <Challenge
                    feat='Współpraca: Sabre Polska'
                    title="Przyjedź do biura rowerem 5 razy"
                    subtitle='3/5 razy'
                    remaining='23 dni do końca'
                    coins={100}
                    progress={60}
                />
            </Card>
        </View>
    );
}

const Events = ({ mode, setMode }: { mode: 'Wydarzenia' | 'Wyzwania', setMode: (mode: 'Wydarzenia' | 'Wyzwania') => void }) => {
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
                        minimumTrackTintColor='#437454'
                        maximumTrackTintColor='#d1e8b0'
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
                    }}
                >
                    <Text style={styles.searchButtonText}>Wyszukaj</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
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
    );
}

const ScheduleApp = () => {
    const slideAnimation = useRef(new Animated.Value(0));
    const toggleWidth = useRef(0);

    const [mode, setMode] = useState<'Wydarzenia' | 'Wyzwania'>('Wydarzenia');

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
                {mode === 'Wydarzenia' ? (
                    <Events mode={mode} setMode={setMode} />
                ) : (
                    <Challanges />
                )}
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
        color: '#437454',
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
        backgroundColor: '#d1e8b0',
        marginRight: 12,
        justifyContent: 'center',
        padding: 2,
    },
    toggleActive: {
        backgroundColor: '#437454',
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
        backgroundColor: '#437454',
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

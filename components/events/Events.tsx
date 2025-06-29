import { Sort, useEventsQuery } from "@/api/__generated__/graphql";
import { Day } from "@/components/events/Day";
import { Event } from "@/components/events/Event";
import { Filters } from "@/components/events/Filters";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export const Events = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filterModalVisible, setFilterModalVisible] = useState(false);

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
    fetchPolicy: 'cache-and-network',
  });

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.calendar}>
        <View style={styles.header}>
          <View style={{ width: 32 }} />
          <Text style={styles.monthTitle}>
            {monthNames[selectedDate.getMonth()]}
          </Text>
          <Pressable onPress={() => setFilterModalVisible((v) => !v)}>
            <View style={{ width: 32, flexDirection: 'row', justifyContent: 'center' }}>
              <Ionicons name="filter-circle-outline" size={32} />
            </View>
          </Pressable>
        </View>

        <View style={styles.weekContainer}>
          {weekDates.map((item, index) => <Day key={index} item={item} index={index} onChange={(item) => setSelectedDate(item.fullDate)} />)}
        </View>

        <View style={styles.divider} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.eventsContainer}>
          {data?.events.data.map((event) => <Event key={event.id} event={event} />)}
        </View>
      </ScrollView>
      {filterModalVisible && <Filters cancel={() => setFilterModalVisible(false)} />}
    </View>
  );
}

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
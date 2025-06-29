import { StyleSheet, Text, TouchableOpacity } from "react-native";


export const Day = ({
  item,
  index,
  onChange
}: {
  item: { isToday: boolean; isSelected: boolean; day: string; date: number; fullDate: Date; };
  index: number;
  onChange: (item: { isToday: boolean; isSelected: boolean; day: string; date: number; fullDate: Date; }) => void;
}) => {
  return (
    <TouchableOpacity
      key={index}
      style={[
        styles.dayItem,
        item.isToday && styles.todayItem,
        item.isSelected && styles.selectedItem
      ]}
      onPress={() => onChange(item)}
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
  )
}

const styles = StyleSheet.create({
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
});
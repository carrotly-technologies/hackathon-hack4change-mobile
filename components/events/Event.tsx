import { EventObject } from "@/api/__generated__/graphql";
import { Image } from "expo-image";
import { Linking, Text, TouchableOpacity, View } from "react-native";

export const Event = ({ event }: {
  event: EventObject;
}) => {
  return (
    <TouchableOpacity onPress={() => {
      if (event.link) {
        Linking.openURL(event.link)
      }
    }} >
      <View key={event.id} style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderLeftWidth: 4,
        borderLeftColor: '#437454',
      }}>
        <View style={{ marginRight: 12, }}>
          <Image source={{ uri: event.imageUrl || 'https://via.placeholder.com/40' }} style={{
            width: 40,
            height: 40,
            backgroundColor: '#d0d0d0',
            borderRadius: 8,
            borderColor: '#bbb',
          }} />
        </View>
        <View style={{
          flex: 1,
          marginRight: 12,
        }}>
          <Text style={{
            fontSize: 16,
            fontWeight: '900',
            color: '#262626',
            marginBottom: 4,
          }}>{event.name}</Text>
          <Text style={{
            fontSize: 12,
            color: '#262626',
          }}>{event.place}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
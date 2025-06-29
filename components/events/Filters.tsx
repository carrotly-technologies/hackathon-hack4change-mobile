import Slider from "@react-native-community/slider";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export const Filters = ({
  cancel
}: {
  cancel: () => void;
}) => {
  const [distanceRange, setDistanceRange] = useState(55);
  const [environmentalFilter, setEnvironmentalFilter] = useState(true);
  const [socialFilter, setSocialFilter] = useState(true);

  return (
    <View style={{
      justifyContent: 'flex-end',
      position: 'absolute',
      width: '100%',
      marginTop: 76,
    }}>
      <View style={{
        backgroundColor: '#f3f3f3',
        padding: 20,
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
          paddingBottom: 15,
        }}>
          <Text style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#333',
          }}>Filtry wyszukiwania</Text>
        </View>

        <View style={{
          marginBottom: 25,
        }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
          }}>
            <Text style={{
              fontSize: 16,
              fontWeight: '600',
              color: '#333',
              marginBottom: 15,
            }}>Zasięg od mojej lokalizacji</Text>
            <Text style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: '#437454',
            }}>{Math.floor(distanceRange)}km</Text>
          </View>
          <Slider
            style={{
              width: '100%',
              height: 40,
            }}
            minimumValue={0}
            maximumValue={100}
            value={distanceRange}
            onValueChange={setDistanceRange}
            minimumTrackTintColor='#437454'
            maximumTrackTintColor='#d1e8b0'
          />
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 5,
          }}>
            <Text style={{
              fontSize: 12,
              color: '#666',
            }}>0km</Text>
            <Text style={{
              fontSize: 12,
              color: '#666',
            }}>100km</Text>
          </View>
        </View>

        <View style={{ marginBottom: 25, }}>
          <Text style={{
            fontSize: 16,
            fontWeight: '600',
            color: '#333',
            marginBottom: 15,
          }}>Typ wydarzeń</Text>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 15,
            }}
            onPress={() => setEnvironmentalFilter(!environmentalFilter)}
          >
            <View style={[{
              width: 50,
              height: 30,
              borderRadius: 15,
              backgroundColor: '#d1e8b0',
              marginRight: 12,
              justifyContent: 'center',
              padding: 2,
            }, environmentalFilter && { backgroundColor: '#437454' }]}>
              <View style={[{
                width: 26,
                height: 26,
                borderRadius: 13,
                backgroundColor: '#fff',
                alignSelf: 'flex-start',
              }, environmentalFilter && {
                alignSelf: 'flex-end',
              }]} />
            </View>
            <Text style={{
              fontSize: 16,
              color: '#333',
            }}>Wydarzenie ekologiczne</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 15,
            }}
            onPress={() => setSocialFilter(!socialFilter)}
          >
            <View style={[{
              width: 50,
              height: 30,
              borderRadius: 15,
              backgroundColor: '#d1e8b0',
              marginRight: 12,
              justifyContent: 'center',
              padding: 2,
            }, socialFilter && { backgroundColor: '#437454' }]}>
              <View style={[{
                width: 26,
                height: 26,
                borderRadius: 13,
                backgroundColor: '#fff',
                alignSelf: 'flex-start',
              }, socialFilter && {
                alignSelf: 'flex-end',
              }]} />
            </View>
            <Text style={{
              fontSize: 16,
              color: '#333',
            }}>Wydarzenie społeczne</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: '#437454',
            borderRadius: 12,
            padding: 16,
            alignItems: 'center',
            marginTop: 10,
          }}
          onPress={() => cancel()}
        >
          <Text style={{
            color: '#fff',
            fontSize: 16,
            fontWeight: 'bold',
          }}>Wyszukaj</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
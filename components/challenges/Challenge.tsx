import { Coin } from "@/components/challenges/Coin"
import { Progress } from "@/components/challenges/Progress"
import { Text, View } from "react-native"

export const Challenge = ({
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
        <Progress progress={progress} size={48} />
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
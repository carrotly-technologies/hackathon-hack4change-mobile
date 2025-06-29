import { PropsWithChildren } from "react";
import { Text, View } from "react-native";

export const Card = ({
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
import { Card } from "@/components/challenges/Card";
import { Challenge } from "@/components/challenges/Challenge";
import { View } from "react-native";

export const Challanges = () => {
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
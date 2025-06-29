import { Challanges } from '@/components/challenges/Challenges';
import { Events } from '@/components/events/Events';
import { useTopTabs } from '@/hooks/useTopTabs';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

const Actions = () => {
  const { activeTab, Tabs } = useTopTabs(['Wydarzenia', 'Wyzwania']);

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: '#fff'
    }}>
      <StatusBar barStyle="dark-content" />
      <LinearGradient
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={['#eeeeee', '#d1e8b0']}
        style={{ flex: 1 }}
      >
        <Tabs />
        {activeTab === 'Wydarzenia' ? <Events /> : <Challanges />}
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Actions;

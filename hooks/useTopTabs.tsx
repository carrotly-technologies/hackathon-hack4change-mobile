import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, LayoutChangeEvent, Text, TouchableOpacity, View } from 'react-native';

export const useTopTabs = <T1 extends string, T2 extends string>(tabs: [T1, T2]) => {
  const [active, setActive] = useState<T1 | T2>(tabs[0]);
  const [width, setWidth] = useState(0);

  const slide = useRef(new Animated.Value(0));

  const onTabLayout = useCallback((event: LayoutChangeEvent) => {
    const { width: layoutWidth } = event.nativeEvent.layout;
    setWidth(layoutWidth);
  }, []);

  const toggleTab = useCallback((tab: T1 | T2) => {
    setActive(tab);
  }, []);

  useEffect(() => {
    if (width > 0) {
      const position = active === tabs[0] ? 0 : width / 2;

      Animated
        .timing(slide.current, {
          toValue: position,
          duration: 200,
          useNativeDriver: false,
        })
        .start();
    }
  }, [active, width, tabs]);

  const Tabs = () => {
    return (
      <View style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.1,
        zIndex: 10,
      }}>
        <View
          style={{
            paddingTop: 25,
            paddingBottom: 12,
            flexDirection: 'row',
            position: 'relative',
            backgroundColor: '#fff',
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
          }}
          onLayout={onTabLayout}
        >
          <Animated.View
            style={[
              {
                position: 'absolute',
                bottom: 0,
                left: 0,
                height: 6,
                backgroundColor: '#437454',
                zIndex: 1,
                transform: [{ translateX: slide.current }],
                width: width > 0 ? width / 2 : '50%',
              }
            ]}
          />
          <TouchableOpacity
            style={{
              flex: 1,
              paddingVertical: 12,
              paddingHorizontal: 20,
              alignItems: 'center',
              zIndex: 1,
            }}
            onPress={() => toggleTab(tabs[0])}
          >
            <Text
              style={[
                {
                  color: '#666',
                  fontWeight: '600',
                  fontSize: 16,
                },
                active === tabs[0] && { color: '#000', fontWeight: 'bold' },
              ]}
            >
              Wydarzenia
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              paddingVertical: 12,
              paddingHorizontal: 20,
              alignItems: 'center',
              zIndex: 1,
            }}
            onPress={() => toggleTab(tabs[1])}
          >
            <Text
              style={[
                {
                  color: '#666',
                  fontWeight: '600',
                  fontSize: 16,
                },
                active === tabs[1] && { color: '#000', fontWeight: 'bold' },
              ]}
            >
              Wyzwania
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return { activeTab: active, toggleTab, onTabLayout, Tabs };
}

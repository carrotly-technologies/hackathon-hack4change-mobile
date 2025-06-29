import React, { FC, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { runOnJS, useAnimatedProps, useSharedValue, withTiming, } from 'react-native-reanimated';
import { interpolatePath } from 'react-native-redash';
import Svg, { Path } from 'react-native-svg';

import AnimatedCircle from "@/components/bottom-tab/AnimatedCircle";
import TabItem from "@/components/bottom-tab/TabItem";
import { getPathXCenter } from "@/utils/constants/Path";
import { SCREEN_WIDTH } from "@/utils/constants/screen";
import usePath from "@/utils/hooks/usePath";
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { usePathname } from "expo-router";

const AnimatedPath = Animated.createAnimatedComponent(Path);
export const CustomBottomTab: FC<BottomTabBarProps & { allItems: any[] }> = ({
    state,
    descriptors,
    navigation, allItems
}) => {
    const { containerPath, curvedPaths, tHeight } = usePath(5);
    const circleXCoordinate = useSharedValue(0);
    const progress = useSharedValue(1);
    const pathname = usePathname()

    useEffect(() => {
        const currentIndex = state.routes
            .findIndex(route => `/home/${route.name}` === pathname);

        progress.value = withTiming((currentIndex || 0) + 1);
    }, [pathname, state.routes]);


    const handleMoveCircle = (currentPath: string) => {
        circleXCoordinate.value = getPathXCenter(currentPath);
    };

    const selectIcon = (routeName: string) => {
        return allItems.filter((tab) => tab.name === routeName)[0]?.icon;
    };

    const animatedProps = useAnimatedProps(() => {
        const currentPath = interpolatePath(
            progress.value,
            Array.from({ length: curvedPaths.length }, (_, index) => index + 1),
            curvedPaths,
        );
        runOnJS(handleMoveCircle)(currentPath);
        return {
            d: `${containerPath} ${currentPath}`,
        };
    });

    const handleTabPress = (index: number, tab: string) => {
        navigation.navigate(tab);
        progress.value = withTiming(index);
    };

    return (
        <View style={styles.tabBarContainer}>
            <Svg width={SCREEN_WIDTH} height={tHeight} style={styles.shadowMd}>
                <AnimatedPath fill={'white'} animatedProps={animatedProps} />
            </Svg>
            <AnimatedCircle circleX={circleXCoordinate} />
            <View
                style={[
                    styles.tabItemsContainer,
                    {
                        height: tHeight,
                    },
                ]}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];

                    return (
                        <TabItem
                            key={index.toString()}
                            label={options.title as string}
                            icon={selectIcon(route.name)}
                            activeIndex={state.index + 1}
                            index={index}
                            onTabPress={() => handleTabPress(index + 1, route.name)}
                        />
                    );
                })}
            </View>
        </View>
    );
};
export default CustomBottomTab;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabBarContainer: {
        position: 'absolute',
        bottom: 0,
        zIndex: 2,
    },
    tabItemsContainer: {
        position: 'absolute',
        flexDirection: 'row',
        width: '100%',
    },
    shadowMd: {
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 3 },
    },
});

/*
-1 /home [{"key": "index-P8f3RTvZ6OpcUTxlyklbc", "name": "index", "params": {}, "path": undefined}, {"key": "rank-UhwJWdmnEtXol_BZ9CJ8p", "name": "rank", "params": undefined}, {"key": "activity-HC5ZEhdiBnvj0UVSmxloe", "name": "activity", "params": undefined}, {"key": "events-LuF3Q8wAEopYiYhW7kl-n", "name": "events", "params": undefined}, {"key": "profile-wlF4sqPkPppdbPioIdnX7", "name": "profile", "params": undefined}]
-1 /home [{"key": "index-P8f3RTvZ6OpcUTxlyklbc", "name": "index", "params": {}, "path": undefined}, {"key": "rank-UhwJWdmnEtXol_BZ9CJ8p", "name": "rank", "params": undefined}, {"key": "activity-HC5ZEhdiBnvj0UVSmxloe", "name": "activity", "params": undefined}, {"key": "events-LuF3Q8wAEopYiYhW7kl-n", "name": "events", "params": undefined}, {"key": "profile-wlF4sqPkPppdbPioIdnX7", "name": "profile", "params": undefined}]
 */
import {Pressable, StyleSheet, Text} from 'react-native';
import React, {FC, forwardRef, ReactElement, useEffect} from 'react';
import Animated, {useAnimatedStyle, useSharedValue, withTiming,} from 'react-native-reanimated';
import usePath from "@/utils/hooks/usePath";
import {getPathXCenterByIndex} from "@/utils/constants/Path";
import {SCREEN_WIDTH} from "@/utils/constants/screen";
import {IconProps} from "@/utils/types";


export type TabProps = {
    label: string;
    icon?: (props: IconProps) => ReactElement;
    index: number;
    activeIndex: number;
    onTabPress: () => void;
};

const ICON_SIZE = 24;
const TabItem: FC<TabProps> = ({
                                   label,
                                   icon,
                                   index,
                                   activeIndex,
                                   onTabPress
                               }) => {
    const {curvedPaths} = usePath(5);
    const animatedActiveIndex = useSharedValue(activeIndex);
    const iconPosition = getPathXCenterByIndex(curvedPaths, index);
    const labelPosition = getPathXCenterByIndex(curvedPaths, index);
    const labelWidth = SCREEN_WIDTH / 5;

    const tabStyle = useAnimatedStyle(() => {
        const translateY = animatedActiveIndex.value - 1 === index ? -20 : 25;
        const iconPositionX = iconPosition! - index * ICON_SIZE;
        return {
            width: ICON_SIZE,
            height: ICON_SIZE,
            transform: [
                {translateY: withTiming(translateY)},
                {translateX: iconPositionX - ICON_SIZE / 2},
            ],
        };
    });

    const labelContainerStyle = useAnimatedStyle(() => {
        const translateY = animatedActiveIndex.value - 1 === index ? 50 : 50;
        return {
            transform: [
                {translateY: translateY},
                {translateX: labelPosition! - labelWidth / 2},
            ],
        };
    });


    useEffect(() => {
        animatedActiveIndex.value = activeIndex;
    }, [activeIndex]);

    const isSelected = activeIndex === index + 1;

    const renderedIcon = forwardRef((props: any, ref: any) => {
        return <Animated.View ref={ref}>{icon?.({
            color: isSelected ? 'white' : 'rgb(13,26,61)',
            size: ICON_SIZE,
        }) || <></>}
        </Animated.View>
    });

    const AnimatedIcon = Animated.createAnimatedComponent(renderedIcon);

    return (
        <>
            <Animated.View style={[tabStyle]}>
                <Pressable
                    testID={`tab${label}`}
                    hitSlop={{top: 24, bottom: 24, left: 24, right: 24}}
                    onPress={onTabPress}>
                    <AnimatedIcon/>
                </Pressable>
            </Animated.View>
            <Animated.View style={[labelContainerStyle, styles.labelContainer, {
                width: labelWidth
            }]}>
                <Text style={styles.label}>{label}</Text>
            </Animated.View>
        </>
    );
};

export default TabItem;

const styles = StyleSheet.create({
    labelContainer: {
        marginTop: 6,
        position: 'absolute',
        alignItems: 'center',
    },
    label: {
        textAlign: "center",
        fontSize: 10,
        fontWeight: '600',
    },
});
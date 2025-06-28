import {StyleSheet} from 'react-native';
import React, {FC} from 'react';
import Animated, {DerivedValue, useAnimatedStyle} from 'react-native-reanimated';

type CircleProps = {
    circleX: DerivedValue<number>;
};
const circleContainerSize = 58;

const AnimatedCircle: FC<CircleProps> = ({circleX}) => {
    const circleContainerStyle = useAnimatedStyle(() => {
        return {
            transform: [{translateX: circleX.value - circleContainerSize / 2}],
        };
    }, []);

    return <Animated.View style={[circleContainerStyle, styles.container, {backgroundColor: '#437454'}]}/>;
};

export default AnimatedCircle;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: -circleContainerSize / 1.6,
        width: circleContainerSize,
        borderRadius: circleContainerSize,
        height: circleContainerSize,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
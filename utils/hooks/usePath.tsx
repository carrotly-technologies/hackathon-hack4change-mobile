import {useMemo} from 'react';
import {curveBasis, line} from 'd3-shape';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {parse} from "react-native-redash";
import {SCREEN_WIDTH} from "@/utils/constants/screen";


type GenerateTabShapePath = (
    position: number,
    adjustedHeight: number,
    numTabs: number,
) => string;

const SCALE = 0.9;
const TAB_BAR_HEIGHT = 70;
const HORIZONTAL_PADDING = 16;

const generateTabShapePath: GenerateTabShapePath = (
    position: number,
    adjustedHeight: number,
    numTabs: number
) => {
    const adjustedWidth = (SCREEN_WIDTH - 2 * HORIZONTAL_PADDING) / numTabs;
    const tabX = HORIZONTAL_PADDING + adjustedWidth * position;

    const lineGenerator = line().curve(curveBasis);
    const tab = lineGenerator([
        [tabX - 100 * SCALE, 0],
        [tabX - (65 + 35) * SCALE, 0],
        [tabX - (50 - 10) * SCALE, -6 * SCALE],
        [tabX - (50 - 15) * SCALE, (adjustedHeight - 14) * SCALE],
        [tabX + (50 - 15) * SCALE, (adjustedHeight - 14) * SCALE],
        [tabX + (50 - 10) * SCALE, -6 * SCALE],
        [tabX + (65 + 35) * SCALE, 0],
        [tabX + 100 * SCALE, 0],
    ]);

    return `${tab}`;
};

const usePath = (numTabs: number) => {
    const insets = useSafeAreaInsets();
    const tHeight = TAB_BAR_HEIGHT + insets.bottom;
    const adjustedHeight = tHeight - insets.bottom;

    const containerPath = useMemo(() => {
        const effectiveWidth = SCREEN_WIDTH;
        return `M0,0
            L${effectiveWidth},0
            L${effectiveWidth},${tHeight}
            L0,${tHeight}
            L0,0`;
    }, [tHeight, HORIZONTAL_PADDING]);

    const curvedPaths = useMemo(() => {
        return Array.from({length: numTabs}, (_, index) => {
            const tabShapePath = generateTabShapePath(index + 0.5, adjustedHeight, numTabs);
            return parse(`${tabShapePath}`);
        });
    }, [adjustedHeight]);

    return {containerPath, curvedPaths, tHeight};
};

export default usePath;
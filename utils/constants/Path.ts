import {parse} from 'react-native-redash';

export const getPathXCenter = (currentPath: string) => {
    const curves = parse(currentPath).curves;
    const startPoint = curves[0].to;
    const endPoint = curves[curves.length - 1].to;
    const centerX = (startPoint.x + endPoint.x) / 2;
    return centerX + 0.5;
};

export const getPathXCenterByIndex = (tabPaths: any[], index: number) => {
    if (!Array.isArray(tabPaths) || index < 0 || index >= tabPaths.length) {
        console.error(`Invalid index: ${index}. tabPaths length: ${tabPaths?.length}`);
        return null;
    }

    const path = tabPaths[index];
    if (!path || !Array.isArray(path.curves)) {
        console.error(`Invalid path at index ${index}:`, path);
        return null;
    }

    const curves = path.curves;
    const startPoint = curves[0]?.to;
    const endPoint = curves[curves.length - 1]?.to;

    if (!startPoint || !endPoint) {
        console.error(`Missing curve points at index ${index}`);
        return null;
    }

    return (startPoint.x + endPoint.x) / 2;
};

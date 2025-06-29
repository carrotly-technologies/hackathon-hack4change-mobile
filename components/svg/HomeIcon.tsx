import Svg, { Path } from "react-native-svg";

export const HomeIcon = ({
  color = "#000000",
  width = 21,
  height = 24
}: {
  color?: string;
  width: number;
  height: number;
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path d="M3.41807 20.597H7.18287V13.0674H14.7125V20.597H18.4773V9.30261L10.9477 3.6554L3.41807 9.30261V20.597ZM0.908203 23.1069V8.04767L10.9477 0.518066L20.9872 8.04767V23.1069H12.2026V15.5773H9.69274V23.1069H0.908203Z" fill={color} />
    </Svg>
  );
}
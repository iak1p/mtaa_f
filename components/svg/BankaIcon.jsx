import * as React from "react";
import Svg, { Path, Rect } from "react-native-svg";

const BankaIcon = ({ props, stroke = "#000" }) => {
  return (
    <Svg
      width={20}
      height={28}
      viewBox="0 0 40 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M32 53.5H8A5.5 5.5 0 012.5 48V22.508c0-1.506.79-2.901 2.08-3.676a16.077 16.077 0 005.694-5.83l.09-.158a4.637 4.637 0 014.03-2.344h12.407c1.007 0 1.904.633 2.241 1.582a12.257 12.257 0 005.888 6.764l.728.379A3.423 3.423 0 0137.5 22.26V48a5.5 5.5 0 01-5.5 5.5z"
        stroke={stroke}
        strokeWidth={5}
      />
      <Rect
        x={5.5}
        y={2.5}
        width={29}
        height={7}
        rx={3.5}
        stroke={stroke}
        strokeWidth={5}
      />
      <Path stroke={stroke} strokeWidth={5} d="M0 42.5L40 42.5" />
    </Svg>
  );
};

export default BankaIcon;

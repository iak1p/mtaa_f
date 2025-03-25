import * as React from "react";
import Svg, { Path } from "react-native-svg";

const Arrow = (props, stroke) => (
  <Svg
    width={22}
    height={22}
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M20.333 11H1.667m0 0L11 20.333M1.667 11L11 1.667"
      stroke={stroke}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default Arrow;

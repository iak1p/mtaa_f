import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SendIcon = ({ props, stroke = "#1E1E1E" }) => (
  <Svg
    width={22}
    height={22}
    viewBox="0 0 44 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M42 2L20 24M42 2L28 42l-8-18M42 2L2 16l18 8"
      stroke={stroke}
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SendIcon;

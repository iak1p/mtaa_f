import * as React from "react";
import Svg, { Path } from "react-native-svg";

function Error({ props, stroke = "#1E1E1E" }) {
  return (
    <Svg
      width={14}
      height={14}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M11.95 2.05l-9.9 9.9m0-9.9l9.9 9.9"
        stroke={stroke}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default Error;

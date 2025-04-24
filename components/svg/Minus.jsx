import * as React from "react";
import Svg, { Path } from "react-native-svg";

function Minus(props) {
  return (
    <Svg
      width={26}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M4.167 10h11.666"
        stroke="#1E1E1E"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default Minus;

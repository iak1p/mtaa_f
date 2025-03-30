import * as React from "react";
import Svg, { Path } from "react-native-svg";

function OtherIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M21 10H3m18-4H3m18 8H3m18 4H3"
        stroke="#1E1E1E"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default OtherIcon;

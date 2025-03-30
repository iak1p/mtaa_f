import * as React from "react";
import Svg, { Path } from "react-native-svg";

function Plus(props) {
  return (
    <Svg
      width={26}
      height={18}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M7 1.167v11.666M1.167 7h11.666"
        stroke="#1E1E1E"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default Plus;

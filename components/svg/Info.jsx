import * as React from "react";
import Svg, { Path } from "react-native-svg";

function Info({ props, stroke = "#1E1E1E" }) {
  return (
    <Svg
      width={23}
      height={40}
      viewBox="0 0 32 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M19.5 2.5h-14A3.5 3.5 0 002 6v28a3.5 3.5 0 003.5 3.5h21A3.5 3.5 0 0030 34V13M19.5 2.5L30 13M19.5 2.5V13H30m-7 8.75H9m14 7H9m3.5-14H9"
        stroke={stroke}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default Info;

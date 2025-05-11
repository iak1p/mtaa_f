import * as React from "react";
import Svg, { Path } from "react-native-svg";

function Clothing({ props, stroke = "#1E1E1E" }) {
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
        d="M3 6l3-4h12l3 4M3 6v14a2 2 0 002 2h14a2 2 0 002-2V6M3 6h18m-5 4a4 4 0 11-8 0"
        stroke={stroke}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default Clothing;

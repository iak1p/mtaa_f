import * as React from "react";
import Svg, { Path } from "react-native-svg";

function OtherIcon({ props, stroke = "#1E1E1E" }) {
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
        d="M12 7a4 4 0 00-4-4H2v15h7a3 3 0 013 3m0-14v14m0-14a4 4 0 014-4h6v15h-7a3 3 0 00-3 3"
        stroke={stroke}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default OtherIcon;

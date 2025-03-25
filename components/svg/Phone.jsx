import * as React from "react";
import Svg, { Path } from "react-native-svg";

function Phone(props) {
  return (
    <Svg
      width={27}
      height={40}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M37.5 28.61v5.25a3.5 3.5 0 01-3.815 3.5 34.632 34.632 0 01-15.103-5.372 34.124 34.124 0 01-10.5-10.5A34.632 34.632 0 012.71 6.315 3.5 3.5 0 016.193 2.5h5.25a3.5 3.5 0 013.5 3.01c.221 1.68.632 3.33 1.225 4.918a3.5 3.5 0 01-.788 3.692l-2.223 2.223a27.999 27.999 0 0010.5 10.5l2.223-2.223a3.5 3.5 0 013.693-.788 22.463 22.463 0 004.917 1.226 3.5 3.5 0 013.01 3.552z"
        stroke="#1E1E1E"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default Phone;

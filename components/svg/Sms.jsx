import * as React from "react";
import Svg, { Path } from "react-native-svg";

function Sms(props) {
  return (
    <Svg
      width={36}
      height={36}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M33.75 17.125a14.665 14.665 0 01-1.575 6.65A14.875 14.875 0 0118.875 32a14.666 14.666 0 01-6.65-1.575L2.25 33.75l3.325-9.975A14.666 14.666 0 014 17.125a14.875 14.875 0 018.225-13.3 14.665 14.665 0 016.65-1.575h.875a14.84 14.84 0 0114 14v.875z"
        stroke="#1E1E1E"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default Sms;

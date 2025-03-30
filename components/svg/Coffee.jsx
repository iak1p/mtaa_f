import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

function Coffee(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_33_263)">
        <Path
          d="M18 8h1a4 4 0 110 8h-1m0-8H2v9a4 4 0 004 4h8a4 4 0 004-4V8zM6 1v3m4-3v3m4-3v3"
          stroke="#1E1E1E"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_33_263">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default Coffee;

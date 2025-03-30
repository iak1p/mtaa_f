import * as React from "react";
import Svg, { Path } from "react-native-svg";

const List = ({ props, stroke = "#1E1E1E" }) => (
  <Svg
    width={24}
    height={20}
    viewBox="0 0 28 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M20.667 7.333H2M26 2H2m24 10.667H2M20.667 18H2"
      stroke={stroke}
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default List;

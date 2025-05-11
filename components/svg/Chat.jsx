import * as React from "react";
import Svg, { Path } from "react-native-svg";

function Chat({ props, stroke = "#1E1E1E" }) {
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
        d="M2 22V4c0-.55.196-1.02.587-1.413A1.926 1.926 0 014 2h16c.55 0 1.02.196 1.413.587C21.803 2.98 22 3.45 22 4v12c0 .55-.196 1.02-.587 1.413A1.926 1.926 0 0120 18H6l-4 4zm3.15-6H20V4H4v13.125L5.15 16z"
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default Chat;

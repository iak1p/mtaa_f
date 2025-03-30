import Svg, { Path } from "react-native-svg";

function AddUserIcon({ props, stroke = "#000" }) {
  return (
    <Svg
      width={24}
      height={20}
      viewBox="0 0 48 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M32 38v-4a8 8 0 00-8-8H10a8 8 0 00-8 8v4m38-26v12m6-6H34m-9-8a8 8 0 11-16 0 8 8 0 0116 0z"
        stroke={stroke}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default AddUserIcon;

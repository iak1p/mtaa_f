import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Email(props) {
  return (
    <Svg
      width={27}
      height={32}
      viewBox="0 0 40 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M37.5 5.5A3.51 3.51 0 0034 2H6a3.51 3.51 0 00-3.5 3.5m35 0v21A3.51 3.51 0 0134 30H6a3.51 3.51 0 01-3.5-3.5v-21m35 0L20 17.75 2.5 5.5"
        stroke="#1E1E1E"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default Email
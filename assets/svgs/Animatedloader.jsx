import * as React from "react"
import Svg, { Defs, LinearGradient, Stop, Circle, Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: animateTransform, animate */

const SvgComponent = (props) => (
    <Svg
        height={70}
        width={70}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 64 64"
        {...props}
    >
        <Defs>
            <LinearGradient
                id="b"
                x1={16.5}
                y1={19.67}
                x2={21.5}
                y2={28.33}
                gradientUnits="userSpaceOnUse"
            >
                <Stop offset={0} stopColor="#fbbf24" />
                <Stop offset={0.45} stopColor="#fbbf24" />
                <Stop offset={1} stopColor="#f59e0b" />
            </LinearGradient>
            <LinearGradient
                id="c"
                x1={22.56}
                y1={21.96}
                x2={39.2}
                y2={50.8}
                gradientUnits="userSpaceOnUse"
            >
                <Stop offset={0} stopColor="#f3f7fe" />
                <Stop offset={0.45} stopColor="#f3f7fe" />
                <Stop offset={1} stopColor="#deeafb" />
            </LinearGradient>
            <LinearGradient
                id="a"
                x1={30.25}
                y1={48.4}
                x2={33.25}
                y2={53.6}
                gradientUnits="userSpaceOnUse"
            >
                <Stop offset={0} stopColor="#b8bdc6" />
                <Stop offset={0.45} stopColor="#b8bdc6" />
                <Stop offset={1} stopColor="#a5aab2" />
            </LinearGradient>
            <LinearGradient
                id="d"
                x1={23.5}
                y1={38.1}
                x2={28}
                y2={45.9}
                xlinkHref="#a"
            />
            <LinearGradient
                id="e"
                x1={33.75}
                y1={28.8}
                x2={39.75}
                y2={39.2}
                xlinkHref="#a"
            />
        </Defs>
        <Circle
            cx={19}
            cy={24}
            r={5}
            stroke="#f8af18"
            strokeMiterlimit={10}
            strokeWidth={0.5}
            fill="url(#b)"
        />
        <Path
            d="M19 15.67V12.5m0 23v-3.17m5.89-14.22 2.24-2.24M10.87 32.13l2.24-2.24m0-11.78-2.24-2.24m16.26 16.26-2.24-2.24M7.5 24h3.17m19.83 0h-3.17"
            fill="none"
            stroke="#fbbf24"
            strokeLinecap="round"
            strokeMiterlimit={10}
            strokeWidth={2}
        ></Path>
        <Path
            d="M46.5 31.5h-.32a10.49 10.49 0 0 0-19.11-8 7 7 0 0 0-10.57 6 7.21 7.21 0 0 0 .1 1.14A7.5 7.5 0 0 0 18 45.5a4.19 4.19 0 0 0 .5 0h28a7 7 0 0 0 0-14Z"
            stroke="#e6effc"
            strokeMiterlimit={10}
            strokeWidth={0.5}
            fill="url(#c)"
        />
        <Circle
            cx={31.75}
            cy={51}
            r={3}
            stroke="#afb4bc"
            strokeMiterlimit={10}
            strokeWidth={0.5}
            fill="url(#a)"
        ></Circle>
        <Circle
            cx={25.75}
            cy={51}
            r={4.5}
            stroke="#afb4bc"
            strokeMiterlimit={10}
            strokeWidth={0.5}
            fill="url(#d)"
        ></Circle>
        <Circle
            cx={36.75}
            cy={51}
            r={6}
            stroke="#afb4bc"
            strokeMiterlimit={10}
            strokeWidth={0.5}
            fill="url(#e)"
        ></Circle>
    </Svg>
)

export default SvgComponent

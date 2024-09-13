
// //Area (Component)
// import { View, Dimensions } from "react-native";
// import { CartesianChart, Area,Line,Bar } from "victory-native";
// const DATA = Array.from({ length: 31 }, (_, i) => ({
//   x: i,
//   y: 40 + 30 * Math.random(),
// }));

// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;



// export default function MyChart() {
//   return (
//     <View style={{ height: windowHeight-200,width:windowWidth-30,margin:10,marginTop:100 }}>    
//      <CartesianChart data={DATA} xKey="x" yKeys={["y"]}>
//       {({ points, chartBounds }) => (
//         //👇 pass a PointsArray to the Line component, y0, as well as options.
//         <Area
//           points={points.y}
//           y0={chartBounds.bottom}
//           connectMissingData={false}
//           color="red"
//           animate={{ type: "timing", duration: 300 }}
//         />
//         // <Line
//         //   points={points.y}
//         //   color="red"
//         //   strokeWidth={3}
//         //   strokeJoin="round"
//         //   animate={{ type: "timing", duration: 300 }}
//         // />
//         // <Bar
//         //   points={points.y}
//         //   chartBounds={chartBounds}
//         //   color="red"
//         //   roundedCorners={{ topLeft: 10, topRight: 10 }}
//         // />
//       )}
//     </CartesianChart>
//     </View>
//   );
// }


//Line chart with tooltip
import * as React from "react";
import { ScrollView, View,Dimensions } from "react-native";
import { CartesianChart, Line, useChartPressState } from "victory-native";
import { Circle, useFont } from "@shopify/react-native-skia";
import type { SharedValue } from "react-native-reanimated";

export default function MyChart() {
  const { state, isActive } = useChartPressState({ x: 0, y: { highTmp: 0 } });

  const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

  return (
    <View style={{ height: windowHeight-200,width:windowWidth-30,margin:10,marginTop:100 }}>    
          <CartesianChart
        data={DATA}
        xKey="day"
        yKeys={["highTmp"]}
       
        chartPressState={state}
      >
        {({ points }) => (
          <>
            <Line points={points.highTmp} color="red" strokeWidth={3} />
            {isActive && (
              <ToolTip x={state.x.position} y={state.y.highTmp.position} />
            )}
          </>
        )}
      </CartesianChart>
    </View>
  );
}

function ToolTip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
  return <Circle cx={x} cy={y} r={8} color="black" />;
}

const DATA = Array.from({ length: 31 }, (_, i) => ({
  day: i,
  highTmp: 40 + 30 * Math.random(),
}));

import React, { useEffect, useState } from "react";
import { Dimensions, Text, View } from "react-native"
import { LineChart,PieChart } from "react-native-chart-kit";

const ChartComponent : React.FC<{
    route: any,
    navigation: any,
    pieChartData: any,
    lineData: any
}> = ({route,navigation,pieChartData,lineData}) =>{

    const width = Dimensions.get('screen').width;
    const height = Dimensions.get('screen').height;

    const chartConfig = {
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        backgroundGradientFromOpacity: 0,
        backgroundGradientToOpacity: 0,
      };
    return(
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
<PieChart
  data={pieChartData}
  width={width}
  height={0.3*height}
  chartConfig={chartConfig}
  accessor={"count"}
  backgroundColor={"transparent"}
  hasLegend={true}
  center={[width/15,0]}
/>
<LineChart
  data={lineData}
  width={width}
  height={0.3*height}
  chartConfig={chartConfig}
  
/>
        </View>
    )
}

export default ChartComponent;
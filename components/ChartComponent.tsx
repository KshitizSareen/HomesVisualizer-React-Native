import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';

// Define types for PieChartData and LineData based on the library's documentation and usage
type PieChartDataItem = {
  name: string;
  count: number;
  color: string;  // Color is typically required for PieChart data
};

type LineData = {
  labels: string[];
  datasets: {
    data: number[];
  }[];
};

type ChartComponentProps = {
  pieChartData: PieChartDataItem[];
  lineData: LineData;
};

const ChartComponent: React.FC<ChartComponentProps> = ({ pieChartData, lineData }) => {
  const width = Dimensions.get('screen').width;
  const height = Dimensions.get('screen').height;

  const chartConfig = {
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
  };

  return (
    <View style={styles.root}>
      <PieChart
        data={pieChartData}
        width={width}
        height={0.3 * height}
        chartConfig={chartConfig}
        accessor={'count'}
        backgroundColor={'transparent'}
        hasLegend={true}
        center={[width / 15, 0]}
        paddingLeft="0"
      />
      <LineChart
        data={lineData}
        width={width}
        height={0.3 * height}
        chartConfig={chartConfig}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChartComponent;

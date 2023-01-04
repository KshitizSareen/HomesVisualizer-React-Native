import React from 'react';
import {Dimensions, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {BarChart} from 'react-native-chart-kit';

const DisplayProperties: React.FC<{
  route: any;
}> = ({route}) => {
  const {data} = route.params;
  let xValue = data.Type_Category;
  let splitXValue = xValue.split(' ');
  let newXValue = [];
  for (let j = 0; j < splitXValue.length; j++) {
    let value = splitXValue[j];
    if (value !== '') {
      newXValue.push(value[0].toUpperCase() + value.slice(1, value.length));
    }
  }
  let newXValueString = newXValue.join(' ');
  const barChartData = {
    labels: ['Price', 'Sq. Feet', 'No. of Beds', 'No. of Baths'],
    datasets: [
      {
        data: [data.Price, data.SqFeet, data.Baths, data.Beds],
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
  };
  const chartConfig = {
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
  };

  const width = Dimensions.get('screen').width;
  const height = Dimensions.get('screen').height;
  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.Header}>Address</Text>
      <Text style={styles.Text}>{data.Address}</Text>
      <View style={styles.rowView}>
        <Text style={styles.inLineText}>State: {data.State}</Text>
        <Text> </Text>
        <Text style={styles.inLineText}>County: {data.County}</Text>
      </View>
      <Text style={styles.Header}>Type</Text>
      <Text style={styles.Text}>{newXValueString}</Text>
      <Text style={styles.Header}>Properties</Text>
      <View style={styles.rowView}>
        <Text style={styles.inLineText}>Price: ${data.Price}</Text>
        <Text> </Text>
        <Text style={styles.inLineText}>Sq. Feet: {data.SqFeet}</Text>
      </View>
      <View style={styles.rowView}>
        <Text style={styles.inLineText}>No. of Beds: {data.Beds}</Text>
        <Text> </Text>
        <Text style={styles.inLineText}>No. of Baths: {data.Baths}</Text>
      </View>
      <BarChart
        data={barChartData}
        width={width}
        height={0.5 * height}
        chartConfig={chartConfig}
        showBarTops={true}
        showValuesOnTopOfBars={true}
        yAxisLabel=""
        yAxisSuffix=""
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Header: {
    fontSize: 20,
    marginBottom: '1%',
    fontWeight: 'bold',
    marginTop: '5%',
  },
  Text: {
    fontSize: 20,
    marginBottom: '1%',
  },
  rowView: {
    flexDirection: 'row',
    marginBottom: '1%',
    width: '100%',
    justifyContent: 'space-evenly',
  },
  inLineText: {
    fontSize: 20,
  },
});

export default DisplayProperties;

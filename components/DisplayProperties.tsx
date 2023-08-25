import React from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

type Data = {
  Address: string;
  State: string;
  County: string;
  Price: number;
  SqFeet: number;
  Beds: number;
  Baths: number;
  Type_Category: string;
};

type RouteProp = {
  params: {
    data: Data;
  };
};

const DisplayProperties: React.FC<{ route: RouteProp }> = ({ route }) => {
  const { Address, State, County, Price, SqFeet, Beds, Baths, Type_Category } = route.params.data;

  const formatTypeCategory = (typeCategory: string) => {
    return typeCategory
      .split(' ')
      .filter(word => word !== '')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const barChartData = {
    labels: ['Price', 'Sq. Feet', 'No. of Beds', 'No. of Baths'],
    datasets: [
      {
        data: [Price, SqFeet, Baths, Beds],
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
        strokeWidth: 2,
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
      <Text style={styles.Text}>{Address}</Text>
      <View style={styles.rowView}>
        <Text style={styles.inLineText}>State: {State}</Text>
        <Text> </Text>
        <Text style={styles.inLineText}>County: {County}</Text>
      </View>
      <Text style={styles.Header}>Type</Text>
      <Text style={styles.Text}>{formatTypeCategory(Type_Category)}</Text>
      <Text style={styles.Header}>Properties</Text>
      <View style={styles.rowView}>
        <Text style={styles.inLineText}>Price: ${Price}</Text>
        <Text> </Text>
        <Text style={styles.inLineText}>Sq. Feet: {SqFeet}</Text>
      </View>
      <View style={styles.rowView}>
        <Text style={styles.inLineText}>No. of Beds: {Beds}</Text>
        <Text> </Text>
        <Text style={styles.inLineText}>No. of Baths: {Baths}</Text>
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

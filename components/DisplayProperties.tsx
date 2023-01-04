import React from 'react';
import {Dimensions, SafeAreaView, StyleSheet, Text,View} from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const DisplayProperties: React.FC<{
  route: any
}> = ({route}) => {
  const {data} = route.params;
  let xValue = data.Type_Category;
  let splitXValue = xValue.split(" ");
  let newXValue=[];
  for(let j=0;j<splitXValue.length;j++)
  {
      let value = splitXValue[j];
      if(value!=="")
      {
          newXValue.push(value[0].toUpperCase()+value.slice(1,value.length));
      }
  }
  let newXValueString = newXValue.join(' ');
  const barChartData = 
  {
    labels: ['Price','Sq. Feet','No. of Beds','No. of Baths'],
    datasets: [
      {
        data: [data.Price,data.SqFeet,data.Baths,data.Beds],
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // optional
        strokeWidth: 2 // optional
      },
    ],
  }
  const chartConfig = {
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
  };

  const width = Dimensions.get('screen').width;
  const height = Dimensions.get('screen').height;
  return (
    <SafeAreaView style={styles.root}>
              <Text style={{
            marginBottom: '3%',
            fontSize: 20,
            marginBottom: '1%',
            fontWeight: 'bold' 
        }}>Address</Text>
      <Text style={{
            marginBottom: '3%',
            fontSize: 20,
            marginBottom: '1%'
        }}>{data.Address}</Text>
                <View style={{
          flexDirection: 'row',
          marginBottom: '5%'
          
        }}>
          <Text style={{
            fontSize: 20,
        }}>State: {data.State}</Text>
        <Text>    </Text>
                  <Text style={{
            fontSize: 20,
        }}>County: {data.County}</Text>
        </View>
                      <Text style={{
            marginBottom: '3%',
            fontSize: 20,
            marginBottom: '1%',
            fontWeight: 'bold' 
        }}>Type</Text>
      <Text style={{
            marginBottom: '3%',
            fontSize: 20,
            marginBottom: '5%'
        }}>{newXValueString}</Text>
              <Text style={{
            marginBottom: '3%',
            fontSize: 20,
            marginBottom: '1%',
            fontWeight: 'bold' 
        }}>Properties</Text>
                        <View style={{
          flexDirection: 'row',
          marginBottom: '1%'
          
        }}>
          <Text style={{
            fontSize: 20,
        }}>Price: ${data.Price}</Text>
        <Text>    </Text>
                  <Text style={{
            fontSize: 20,
        }}>Sq. Feet: {data.SqFeet}</Text>
        </View>
        <View style={{
          flexDirection: 'row',
          marginBottom: '3%'
          
        }}>
          <Text style={{
            fontSize: 20,
        }}>No. of Beds: {data.Beds}</Text>
        <Text>    </Text>
                  <Text style={{
            fontSize: 20,
        }}>No. of Baths: {data.Baths}</Text>
        </View>
      <BarChart
  data={barChartData}
  width={width}
  height={0.5*height}
  chartConfig={chartConfig}
  showBarTops={true}
  showValuesOnTopOfBars={true}
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
});

export default DisplayProperties;

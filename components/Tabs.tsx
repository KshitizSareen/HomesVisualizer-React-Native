import React, {useCallback, useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Map from './Map';
import ChartComponent from './ChartComponent';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMap} from '@fortawesome/free-regular-svg-icons';
import {faChartSimple} from '@fortawesome/free-solid-svg-icons';

type pieChartData = {
  name: string;
  count: number;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
};

const Tab = createBottomTabNavigator();
const Tabs = () => {
  const [chartsByCategory, setChartsByCategory] = useState([]);
  const [pieChartData, setPieChartData] = useState([{}]);
  const [lineData, setLineChartData] = useState({});

  const formatPieChartData = useCallback(() => {
    let data: pieChartData[] = [];
    let labels = [];
    let avgPriceData = [];
    let minPriceData = [];
    let maxPriceData = [];
    for (let i = 0; i < chartsByCategory.length; i++) {
      let chartElem: any = chartsByCategory[i];
      let xValue = chartElem.Category;
      let splitXValue = xValue.split(' ');
      let newXValue = [];
      for (let j = 0; j < splitXValue.length; j++) {
        let value = splitXValue[j];
        if (value !== '') {
          newXValue.push(value[0].toUpperCase() + value.slice(1, value.length));
        }
      }
      let newXValueString = newXValue.join(' ') + 's';
      data.push({
        name: newXValueString,
        count: chartElem.Count,
        color: getRandomColor(),
        legendFontColor: '#7F7F7F',
        legendFontSize: 12,
      });
      labels.push(newXValueString);
      avgPriceData.push(chartElem.AvgPrice);
      minPriceData.push(chartElem.MinPrice);
      maxPriceData.push(chartElem.MaxPrice);
    }
    setPieChartData(data);
    setLineChartData({
      labels: labels,
      datasets: [
        {
          data: avgPriceData,
          color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // optional
          strokeWidth: 2, // optional
        },
        {
          data: minPriceData,
          color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`, // optional
          strokeWidth: 2, // optional
        },
        {
          data: maxPriceData,
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // optional
          strokeWidth: 2, // optional
        },
      ],
      legend: ['Avg Price', 'Min Price', 'Max Price'],
    });
  }, [chartsByCategory]);

  useEffect(() => {
    formatPieChartData();
  }, [chartsByCategory, formatPieChartData]);

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          if (route.name === 'View Listings') {
            return <FontAwesomeIcon icon={faMap} size={size} color={color} />;
          }
          if (route.name === 'Analyze Data') {
            return (
              <FontAwesomeIcon icon={faChartSimple} size={size} color={color} />
            );
          }
        },
      })}>
      <Tab.Screen
        name="View Listings"
        component={Map}
        initialParams={{
          setChartsByCategory,
        }}
      />
      <Tab.Screen
        name="Analyze Data"
        children={props => {
          return (
            <ChartComponent
              {...props}
              pieChartData={pieChartData}
              lineData={lineData}
            />
          );
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;

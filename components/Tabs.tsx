import React, { useCallback, useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMap } from '@fortawesome/free-regular-svg-icons';
import { faChartSimple } from '@fortawesome/free-solid-svg-icons';

import Map from './Map';
import ChartComponent from './ChartComponent';

type PieChartData = {
  name: string;
  count: number;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
};

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const [chartsByCategory, setChartsByCategory] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [lineData, setLineChartData] = useState({});

  const formatCategory = (category) => {
    return category.split(' ')
      .filter(value => value)
      .map(value => value.charAt(0).toUpperCase() + value.slice(1))
      .join(' ') + 's';
  }

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const formatPieChartData = useCallback(() => {
    const data = [];
    const labels = [];
    const avgPriceData = [];
    const minPriceData = [];
    const maxPriceData = [];

    for (const chartElem of chartsByCategory) {
      const formattedCategory = formatCategory(chartElem.Category);
      data.push({
        name: formattedCategory,
        count: chartElem.Count,
        color: getRandomColor(),
        legendFontColor: '#7F7F7F',
        legendFontSize: 12,
      });
      labels.push(formattedCategory);
      avgPriceData.push(chartElem.AvgPrice);
      minPriceData.push(chartElem.MinPrice);
      maxPriceData.push(chartElem.MaxPrice);
    }

    setPieChartData(data);
    setLineChartData({
      labels,
      datasets: [
        { data: avgPriceData, color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, strokeWidth: 2 },
        { data: minPriceData, color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`, strokeWidth: 2 },
        { data: maxPriceData, color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, strokeWidth: 2 },
      ],
      legend: ['Avg Price', 'Min Price', 'Max Price'],
    });
  }, [chartsByCategory]);

  useEffect(() => {
    formatPieChartData();
  }, [chartsByCategory, formatPieChartData]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let icon;
          if (route.name === 'View Listings') icon = faMap;
          if (route.name === 'Analyze Data') icon = faChartSimple;
          return <FontAwesomeIcon icon={icon} size={size} color={color} />;
        },
      })}>
      <Tab.Screen
        name="View Listings"
        component={Map}
        initialParams={{ setChartsByCategory }}
      />
      <Tab.Screen
        name="Analyze Data"
        children={props => <ChartComponent {...props} pieChartData={pieChartData} lineData={lineData} />}
      />
    </Tab.Navigator>
  );
};

export default Tabs;

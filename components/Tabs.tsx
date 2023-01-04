import React,{useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CreateHomes from './CreateHomes';
import FilterHomes from './FilterHomes';
import Map from './Map';
import Icon from 'react-native-vector-icons/Ionicons'
import ChartComponent from './ChartComponent';

const Tab = createBottomTabNavigator();
const Tabs = () => {

  const [chartsByLocation,setChartsByLocation] = useState([])
  const [chartsByCategory,setChartsByCategory] = useState([])
  const [chartsByListing,setChartsByListing] = useState([])
  const [pieChartData,setPieChartData] = useState([]);
  const [lineData,setLineChartData] = useState({});

  useEffect(()=>{
    formatPieChartData();
  },[chartsByCategory])

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function formatPieChartData ()
  {
    let data =[];
    let labels=[];
    let avgPriceData = [];
    let minPriceData = [];
    let maxPriceData = [];
    for(let i=0;i<chartsByCategory.length;i++)
    {
      let chartElem=chartsByCategory[i];
      let xValue = chartElem.Category;
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
      let newXValueString = newXValue.join(' ') + "s";
      data.push({
        name: newXValueString,
        count: chartElem.Count,
        color: getRandomColor(),
        legendFontColor: "#7F7F7F",
        legendFontSize: 12
      })
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
          strokeWidth: 2 // optional
        },
        {
          data: minPriceData,
          color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`, // optional
          strokeWidth: 2 // optional
        },
        {
          data: maxPriceData,
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // optional
          strokeWidth: 2 // optional
        },
      ],
      legend: ["Avg Price","Min Price","Max Price"]
    })
  }




  return (
    <Tab.Navigator screenOptions={({route})=>({
      tabBarIcon: ({ color, size }) => {
        if(route.name=="View Listings")
        {
          return(
            <Icon name="map" size={size} color={color}/>
          )
        }
        if(route.name=="Analyze Data")
        {
          return(
            <Icon name="stats-chart" size={size} color={color}/>
          )
        }
      }
    })}>
      <Tab.Screen name="View Listings" component={Map} initialParams={{
        setChartsByLocation,
        setChartsByCategory,
        setChartsByListing
      }}/>
      <Tab.Screen name="Analyze Data" children={(props)=>{
        return(
        <ChartComponent {...props} pieChartData={pieChartData} lineData={lineData}/>
        )
      }} />
    </Tab.Navigator>
  );
};

export default Tabs;

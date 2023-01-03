import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CreateHomes from './CreateHomes';
import FilterHomes from './FilterHomes';
import Map from './Map';
import Icon from 'react-native-vector-icons/Ionicons'

const Tab = createBottomTabNavigator();
const Tabs = () => {
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
      <Tab.Screen name="View Listings" component={Map} />
      <Tab.Screen name="Analyze Data" component={CreateHomes} />
    </Tab.Navigator>
  );
};

export default Tabs;

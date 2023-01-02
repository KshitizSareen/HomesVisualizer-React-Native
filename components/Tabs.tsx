import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CreateHomes from './CreateHomes';
import FilterHomes from './FilterHomes';

const Tab = createBottomTabNavigator();
const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Search Listings" component={FilterHomes} />
      <Tab.Screen name="Add Listing" component={CreateHomes} />
    </Tab.Navigator>
  );
};

export default Tabs;

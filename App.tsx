import React, { useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Tabs from './components/Tabs';
import DisplayProperties from './components/DisplayProperties';
import FilterHomes from './components/FilterHomes';
import { Text, TouchableOpacity } from 'react-native';

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Filter Listings" component={FilterHomes} options={({route,navigation})=>({
            headerRight: (color,size)=>{
              return(
                <TouchableOpacity onPress={()=>{
                  console.log(route.params);
                }}>
                <Text style={{
                  color: '#3978db',
                  fontSize: 16
                }}>Add Listing</Text>
                </TouchableOpacity>
              )
            }
          })
        }/>
        <Stack.Screen name="DisplayProperties" component={DisplayProperties} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

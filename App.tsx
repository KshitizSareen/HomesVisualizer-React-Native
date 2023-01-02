import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Tabs from './components/Tabs';
import Map from './components/Map';
import DisplayProperties from './components/DisplayProperties';

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
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="DisplayProperties" component={DisplayProperties} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

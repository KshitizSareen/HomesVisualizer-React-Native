import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Tabs from './components/Tabs';
import DisplayProperties from './components/DisplayProperties';
import FilterHomes from './components/FilterHomes';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

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
        <Stack.Screen name="Filter Listings" component={FilterHomes} />
        <Stack.Screen name="Display Properties" component={DisplayProperties} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

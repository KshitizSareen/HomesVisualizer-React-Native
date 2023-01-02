import React from 'react';
import {View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

const Map: React.FC<{
  navigation: any;
}> = ({navigation}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigateToProperties = () => {
    navigation.navigate('DisplayProperties');
  };
  return (
    <MapView
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      style={{
        flex: 1,
      }}>
      <Marker
        coordinate={{
          latitude: 37.773972,
          longitude: -122.4194,
        }}
        title="Test Title"
        description="Test Description"
      />
    </MapView>
  );
};

export default Map;

import React, { useReducer, useState } from 'react';
import {View,TouchableOpacity} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons'
import { intialFilterState } from '../State/FIltersState';
import MapReducer, { initialMapState } from '../State/MapState';

const Map: React.FC<{
  navigation: any;
}> = ({navigation}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const [filtersState,setFiltersState] = useState(intialFilterState);
  const [mapState,setMapState] = useState(initialMapState);

  const navigateToProperties = () => {
    navigation.navigate('DisplayProperties');
  };

  const navigateToFilterComponent = () =>{
    navigation.navigate('Filter Listings', {
      filtersState,
      setFiltersState,
      mapState
    });
  }

  return (
    <MapView
      initialRegion={{
        latitude: 37.0902,
        longitude: -95.7129,
        latitudeDelta: Math.round(360 / Math.pow(Math.E, 2.5 * Math.LN2)),
        longitudeDelta: Math.round(360 / Math.pow(Math.E, 2.5 * Math.LN2)),
      }}
      style={{
        flex: 1,
      }}
      onRegionChange={region => {
        mapState.zoom = Math.round(Math.log(360 / region.longitudeDelta) / Math.LN2)
        mapState.minLat =  region.latitude-(region.latitudeDelta/2)
        mapState.maxLat =  region.latitude+(region.latitudeDelta/2)
        mapState.minLong = region.longitude-(region.latitudeDelta/2)
        mapState.maxLong = region.longitude+(region.latitudeDelta/2)
        setMapState(mapState);
        console.log(mapState);
      }}>
      <Marker
        coordinate={{
          latitude: 37.773972,
          longitude: -122.4194,
        }}
        title="Test Title"
        description="Test Description"
      />
      <TouchableOpacity style={{
        marginRight: '5%',
        marginTop: '5%',
        alignSelf: 'flex-end',
        backgroundColor: 'darkblue',
        padding: '2%',
        borderRadius: 10
      }}>
      <Icon name="reload" size={30} color="lightblue" />
      </TouchableOpacity>
      <TouchableOpacity style={{
        marginTop: '2%',
        marginRight: '5%',
        alignSelf: 'flex-end',
        backgroundColor: 'darkblue',
        padding: '2%',
        borderRadius: 10
      }} onPress={navigateToFilterComponent}>
      <Icon name="filter" size={30} color="lightblue" />
      </TouchableOpacity>
    </MapView>
  );
};

export default Map;

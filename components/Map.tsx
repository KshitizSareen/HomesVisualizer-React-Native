import React, { useReducer, useState } from 'react';
import {View,TouchableOpacity} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons'
import { intialFilterState } from '../State/FIltersState';
import MapReducer, { initialMapState } from '../State/MapState';
import axios from 'axios';

const Map: React.FC<{
  navigation: any;
}> = ({navigation}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const [filtersState,setFiltersState] = useState(intialFilterState);
  const [mapState,setMapState] = useState(initialMapState);
  const [resultsData,setResultsData] = useState([]);
  const [preLoad,setPreload] = useState(true);

  const navigateToProperties = () => {
    navigation.navigate('DisplayProperties');
  };

  const navigateToFilterComponent = () =>{
    navigation.navigate('Filter Listings', {
      filtersState,
      setFiltersState,
      mapState,
      setResults
    });
  }

  function getHousingTypes(){
    let HousingTypeArray=[];
    if(filtersState.housingTypes['Apartment']===true)
    {
      HousingTypeArray.push('0')
    }
    if(filtersState.housingTypes['Condo']===true)
    {
      HousingTypeArray.push('1')
    }
    if(filtersState.housingTypes['House']===true)
    {
      HousingTypeArray.push('2')
    }
    if(filtersState.housingTypes['Duplex']===true)
    {
      HousingTypeArray.push('3')
    }
    if(filtersState.housingTypes['Townhouse']===true)
    {
      HousingTypeArray.push('4')
    }
    if(filtersState.housingTypes['Loft']===true)
    {
      HousingTypeArray.push('5')
    }
    if(filtersState.housingTypes['Manufactured']===true)
    {
      HousingTypeArray.push('6')
    }
    if(filtersState.housingTypes['Cottage/Cabin']===true)
    {
      HousingTypeArray.push('7')
    }
    if(filtersState.housingTypes['Flat']===true)
    {
      HousingTypeArray.push('8')
    }
    if(filtersState.housingTypes['In-law']===true)
    {
      HousingTypeArray.push('9')
    }
    if(filtersState.housingTypes['Land']===true)
    {
      HousingTypeArray.push('10')
    }
    if(filtersState.housingTypes['Assisted Living']===true)
    {
      HousingTypeArray.push('11')
    }

    const housing = HousingTypeArray.join(',')
    console.log(housing);
    return housing;
  }

  const setResults = () =>{
    const housing = getHousingTypes();
    axios.post("https://4z7a62t8x1.execute-api.us-west-1.amazonaws.com/csc805-datavis-stage/search-houses",{
      "housingTypes": housing.length === 0 ? "NULL" : "'"+housing+"'",
      "minPrice": parseInt(filtersState.minPrice),
      "maxPrice": parseInt(filtersState.maxPrice),
      "minSqFeet": parseInt(filtersState.minSquareFeet),
      "maxSqFeet": parseInt(filtersState.maxSquareFeet),
      "minBeds": parseInt(filtersState.minBeds),
      "maxBeds": parseInt(filtersState.maxBeds),
      "minBaths": parseInt(filtersState.minBaths),
      "maxBaths": parseInt(filtersState.maxBaths),
      "catsAllowed": "NULL",
      "dogsAllowed": "NULL",
      "smokingAllowed": "NULL",
      "wheelchairAccess": "NULL",
      "electricVehicleCharge": "NULL",
      "comesFurnished": "NULL",
      "minLat": mapState.minLat,
      "maxLat": mapState.maxLat,
      "minLong": mapState.minLong,
      "maxLong": mapState.maxLong
    }).then(res=>{
      setResultsData(res.data);
    })
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
        if(preLoad)
        {
          setResults();
          setPreload(false);

}
      }}>
        {
          resultsData.map((d,index)=>{
            return(
              <Marker key={index}
              coordinate={{
                latitude: d.Lat,
                longitude: d.Long,
              }}
              title={d.Address}
            />
            )
          })
        }
      <TouchableOpacity style={{
        marginRight: '5%',
        marginTop: '5%',
        alignSelf: 'flex-end',
        backgroundColor: 'darkblue',
        padding: '2%',
        borderRadius: 10
      }} onPress={()=>{
        setResults();
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

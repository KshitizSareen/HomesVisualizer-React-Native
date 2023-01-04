import React, {useState} from 'react';
import {TouchableOpacity, Alert, StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {intialFilterState} from '../State/FIltersState';
import {initialMapState} from '../State/MapState';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faFilter, faRotateLeft} from '@fortawesome/free-solid-svg-icons';
import {View} from 'react-native-ui-lib';

const Map: React.FC<{
  route: any;
  navigation: any;
}> = ({route, navigation}) => {
  const {setChartsByCategory} = route.params;

  const [filtersState, setFiltersState] = useState(intialFilterState);
  const [mapState, setMapState] = useState(initialMapState);
  const [resultsData, setResultsData] = useState([]);
  const [preLoad, setPreload] = useState(true);

  const navigateToFilterComponent = () => {
    navigation.navigate('Filter Listings', {
      filtersState,
      setFiltersState,
      setResults,
      setResultsData,
      setChartData,
    });
  };

  function getHousingTypes() {
    let HousingTypeArray = [];
    if (filtersState.housingTypes.Apartment === true) {
      HousingTypeArray.push('0');
    }
    if (filtersState.housingTypes.Condo === true) {
      HousingTypeArray.push('1');
    }
    if (filtersState.housingTypes.House === true) {
      HousingTypeArray.push('2');
    }
    if (filtersState.housingTypes.Duplex === true) {
      HousingTypeArray.push('3');
    }
    if (filtersState.housingTypes.Townhouse === true) {
      HousingTypeArray.push('4');
    }
    if (filtersState.housingTypes.Loft === true) {
      HousingTypeArray.push('5');
    }
    if (filtersState.housingTypes.Manufactured === true) {
      HousingTypeArray.push('6');
    }
    if (filtersState.housingTypes['Cottage/Cabin'] === true) {
      HousingTypeArray.push('7');
    }
    if (filtersState.housingTypes.Flat === true) {
      HousingTypeArray.push('8');
    }
    if (filtersState.housingTypes['In-law'] === true) {
      HousingTypeArray.push('9');
    }
    if (filtersState.housingTypes.Land === true) {
      HousingTypeArray.push('10');
    }
    if (filtersState.housingTypes['Assisted Living'] === true) {
      HousingTypeArray.push('11');
    }

    const housing = HousingTypeArray.join(',');
    console.log(housing);
    return housing;
  }

  function groupHousesByType() {
    const housing = getHousingTypes();
    axios
      .post(
        'https://4z7a62t8x1.execute-api.us-west-1.amazonaws.com/csc805-datavis-stage/group-houses-by-type',
        {
          housingTypes: housing.length === 0 ? 'NULL' : "'" + housing + "'",
          minPrice: parseInt(filtersState.minPrice, 10),
          maxPrice: parseInt(filtersState.maxPrice, 10),
          minSqFeet: parseInt(filtersState.minSquareFeet, 10),
          maxSqFeet: parseInt(filtersState.maxSquareFeet, 10),
          minBeds: parseInt(filtersState.minBeds, 10),
          maxBeds: parseInt(filtersState.maxBeds, 10),
          minBaths: parseInt(filtersState.minBaths, 10),
          maxBaths: parseInt(filtersState.maxBaths, 10),
          catsAllowed: 'NULL',
          dogsAllowed: 'NULL',
          smokingAllowed: 'NULL',
          wheelchairAccess: 'NULL',
          electricVehicleCharge: 'NULL',
          comesFurnished: 'NULL',
          minLat: mapState.minLat,
          maxLat: mapState.maxLat,
          minLong: mapState.minLong,
          maxLong: mapState.maxLong,
        },
      )
      .then(res => {
        setChartsByCategory(res.data);
      })
      .catch(() => {
        Alert.alert('Please Narrow Down Your Search');
      });
  }

  const setChartData = () => {
    groupHousesByType();
  };

  const setResults = (setStateFunction: {
    (value: React.SetStateAction<never[]>): void;
    (value: React.SetStateAction<never[]>): void;
    (arg0: any): void;
  }) => {
    const housing = getHousingTypes();
    axios
      .post(
        'https://4z7a62t8x1.execute-api.us-west-1.amazonaws.com/csc805-datavis-stage/search-houses',
        {
          housingTypes: housing.length === 0 ? 'NULL' : "'" + housing + "'",
          minPrice: parseInt(filtersState.minPrice, 10),
          maxPrice: parseInt(filtersState.maxPrice, 10),
          minSqFeet: parseInt(filtersState.minSquareFeet, 10),
          maxSqFeet: parseInt(filtersState.maxSquareFeet, 10),
          minBeds: parseInt(filtersState.minBeds, 10),
          maxBeds: parseInt(filtersState.maxBeds, 10),
          minBaths: parseInt(filtersState.minBaths, 10),
          maxBaths: parseInt(filtersState.maxBaths, 10),
          catsAllowed: 'NULL',
          dogsAllowed: 'NULL',
          smokingAllowed: 'NULL',
          wheelchairAccess: 'NULL',
          electricVehicleCharge: 'NULL',
          comesFurnished: 'NULL',
          minLat: mapState.minLat,
          maxLat: mapState.maxLat,
          minLong: mapState.minLong,
          maxLong: mapState.maxLong,
        },
      )
      .then(res => {
        setStateFunction(res.data);
      })
      .catch(() => {
        Alert.alert('Please Narrow Down Your Search');
      });
  };

  return (
    <View style={styles.mapStyle}>
      <MapView
        initialRegion={{
          latitude: 37.0902,
          longitude: -95.7129,
          latitudeDelta: Math.round(360 / Math.pow(Math.E, 2.5 * Math.LN2)),
          longitudeDelta: Math.round(360 / Math.pow(Math.E, 2.5 * Math.LN2)),
        }}
        style={styles.mapStyle}
        onRegionChange={region => {
          mapState.zoom = Math.round(
            Math.log(360 / region.longitudeDelta) / Math.LN2,
          );
          mapState.minLat = region.latitude - region.latitudeDelta / 2;
          mapState.maxLat = region.latitude + region.latitudeDelta / 2;
          mapState.minLong = region.longitude - region.latitudeDelta / 2;
          mapState.maxLong = region.longitude + region.latitudeDelta / 2;
          setMapState(mapState);
          if (preLoad) {
            setResults(setResultsData);
            setChartData();
            setPreload(false);
          }
        }}>
        {resultsData.map((d: any, index) => {
          return (
            <Marker
              key={index}
              coordinate={{
                latitude: d.Lat,
                longitude: d.Long,
              }}
              title={d.Address}
              onPress={() => {
                console.log(d);
                navigation.navigate('Display Properties', {
                  data: d,
                });
              }}
            />
          );
        })}
      </MapView>
      <TouchableOpacity
        style={styles.mapButtonReload}
        onPress={() => {
          setResults(setResultsData);
          setChartData();
        }}>
        <FontAwesomeIcon icon={faRotateLeft} size={30} color="lightblue" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.mapButtonFilter}
        onPress={navigateToFilterComponent}>
        <FontAwesomeIcon icon={faFilter} size={30} color="lightblue" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mapButtonReload: {
    right: 10,
    top: 10,
    alignSelf: 'flex-end',
    backgroundColor: 'darkblue',
    borderRadius: 10,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  mapButtonFilter: {
    right: 10,
    top: 70,
    alignSelf: 'flex-end',
    backgroundColor: 'darkblue',
    borderRadius: 10,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  mapStyle: {
    flex: 1,
  },
});

export default Map;

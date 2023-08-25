import React, { useState } from 'react';
import { TouchableOpacity, Alert, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { intialFilterState } from '../State/FiltersState';
import { initialMapState } from '../State/MapState';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFilter, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { View } from 'react-native-ui-lib';
import { DATAVIS_API_URL } from "@env";  // Import the environment variable

interface Props {
  route: {
    params: {
      setChartsByCategory: (data: any) => void;
    };
  };
  navigation: {
    navigate: (route: string, params?: any) => void;
  };
}

interface ListingData {
  Lat: number;
  Long: number;
  Address: string;
}

const Map: React.FC<Props> = ({ route, navigation }) => {
  const { setChartsByCategory } = route.params;

  const [filtersState, setFiltersState] = useState(intialFilterState);
  const [mapState, setMapState] = useState(initialMapState);
  const [resultsData, setResultsData] = useState<ListingData[]>([]);
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

  const getHousingTypes = (): string => {
    const housingTypes = [
      'Apartment', 'Condo', 'House', 'Duplex', 'Townhouse', 'Loft', 
      'Manufactured', 'Cottage/Cabin', 'Flat', 'In-law', 'Land', 'Assisted Living'
    ];
    return housingTypes
      .map((type, index) => filtersState.housingTypes[type] && index.toString())
      .filter(Boolean)
      .join(',');
  };

  const performApiCall = (url: string, setStateFunction: React.Dispatch<React.SetStateAction<any>>) => {
    const housing = getHousingTypes();
    axios
      .post(url, {
        housingTypes: housing.length === 0 ? 'NULL' : `'${housing}'`,
        ...filtersState,
        minLat: mapState.minLat,
        maxLat: mapState.maxLat,
        minLong: mapState.minLong,
        maxLong: mapState.maxLong,
      })
      .then(res => {
        setStateFunction(res.data);
      })
      .catch(() => {
        Alert.alert('Please Narrow Down Your Search');
      });
  };

  const setChartData = () => {
    performApiCall(`${DATAVIS_API_URL}/group-houses-by-type`, setChartsByCategory);
  };

  const setResults = () => {
    performApiCall(`${DATAVIS_API_URL}/search-houses`, setResultsData);
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
        {resultsData.map((d, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: d.Lat,
              longitude: d.Long,
            }}
            title={d.Address}
            onPress={() => {
              console.log(d);
              navigation.navigate('Display Properties', { data: d });
            }}
          />
        ))}
      </MapView>
      <TouchableOpacity
        style={styles.mapButtonReload}
        onPress={() => {
          setResults();
          setChartData();
        }}
      >
        <FontAwesomeIcon icon={faRotateLeft} size={30} color="lightblue" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.mapButtonFilter}
        onPress={navigateToFilterComponent}
      >
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

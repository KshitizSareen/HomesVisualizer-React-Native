import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';
import {Incubator} from 'react-native-ui-lib';
const {TextField} = Incubator;
const HousingTypesArray = [
  ['Apartment', 'Condo', 'Manufactured', 'Duplex',
  'Townhouse', 'Loft'],[ 'House', 'Cottage/Cabin',
  'Flat', 'In-law','Land', 'Assisted Living']
];
const HousingTypeValues = {
  Apartment: false,
  Condo: false,
  Manufactured: false,
  Duplex: false,
  Townhouse: false,
  Loft: false,
  House: false,
  'Cottage/Cabin': false,
  Flat: false,
  'In-law': false,
  Land: false,
  'Assisted Living': false,
}
const booleanFilters=["Cats Allowed","Dogs Allowed","Smoking Allowed","Wheelchair Access","Electric Vehicle Charge","Comes Furnished"]
const booleanFilterValues={
  'Cats Allowed': "NULL",
  'Dogs Allowed': "NULL",
  'Smoking Allowed': "NULL",
  'Wheelchair Access': "NULL",
  'Electric Vehicle Charge': "NULL",
  'Comes Furnished': "NULL",
}

const FilterHomes: React.FC<{
  route: any,
  navigation: any;
}> = ({route,navigation}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const navigateToMap = () => {
    navigation.navigate('Map');
  };

  const {filtersState,setFiltersState,mapState} = route.params;
  const [housingType, setHousingType] = useState('0');
  const [minPrice,setMinPrice]=useState(500);
  const [maxPrice,setMaxPrice]=useState(1000);

  useEffect(()=>{
  },[filtersState]);

  return (
    <SafeAreaView style={styles.root}>
        <ScrollView contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center'
        }}>
        <Text style={{
            marginBottom: '3%',
            fontSize: 20,
            marginTop: '3%'
        }}>Housing Types</Text>
      <View style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginBottom: '3%'
      }}>
        {HousingTypesArray.map(typeArray => {
          return (
            <View
              style={{
                justifyContent: 'space-between',
              }}>
              {typeArray.map(type => {
                return (
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: '3%'
                    }}>
                  <CheckBox
                    disabled={false}
                    onValueChange={newValue =>{
                      filtersState.housingTypes[type] = newValue;
                      setFiltersState(filtersState);
                    }
                    }
                    value={filtersState.housingTypes[type]}
                  />
                  <Text style={{
                    marginLeft: '5%',
                    fontSize: 20
                  }}>{type}</Text>
                  </View>
                );
              })}
            </View>
          );
        })}
      </View>
      <Text style={{
            marginBottom: '1%',
            fontSize: 20
        }}>Price</Text>    
        <View style={{
            justifyContent: 'space-evenly',
            flexDirection: 'row',
            width: '100%',
            marginBottom: '3%'
        }}>
            <TextInput placeholder='Minimum' keyboardType="number-pad" style={{
                width: '30%',
                fontSize: 20,
                borderRadius: 5,
                padding: 5,
                borderWidth: 1,

            }} onChangeText={(event)=>{
                const value = parseInt(event);
                if(isNaN(value))
                {
                filtersState.minPrice = '0';
                }
                else{
                filtersState.minPrice = value.toString();
                }
                setFiltersState(filtersState);

            }} defaultValue={filtersState.minPrice}/>
                        <TextInput placeholder='Maximum' keyboardType="number-pad" style={{
                width: '30%',
                fontSize: 20,
                borderRadius: 5,
                padding: 5,
                borderWidth: 1,

            }} onChangeText={(event)=>{
              const value = parseInt(event);
              if(isNaN(value))
              {
              filtersState.maxPrice = '0';
              }
              else{
              filtersState.maxPrice = value.toString();
              }
              setFiltersState(filtersState);
            }} defaultValue={filtersState.maxPrice}/>
    
        </View>
        <Text style={{
            marginBottom: '1%',
            fontSize: 20
        }}>Square Feet</Text>    
        <View style={{
            justifyContent: 'space-evenly',
            flexDirection: 'row',
            width: '100%',
            marginBottom: '3%'
        }}>
            <TextInput placeholder='Minimum' keyboardType="number-pad" style={{
                width: '30%',
                fontSize: 20,
                borderRadius: 5,
                padding: 5,
                borderWidth: 1,

            }} onChangeText={(event)=>{
              const value = parseInt(event);
              if(isNaN(value))
              {
              filtersState.minSquareFeet = '0';
              }
              else{
              filtersState.minSquareFeet = value.toString();
              }
              setFiltersState(filtersState);
            }} defaultValue={filtersState.minSquareFeet}/>
                        <TextInput placeholder='Maximum' keyboardType="number-pad" style={{
                width: '30%',
                fontSize: 20,
                borderRadius: 5,
                padding: 5,
                borderWidth: 1,

            }} onChangeText={(event)=>{
              const value = parseInt(event);
              if(isNaN(value))
              {
              filtersState.maxSquareFeet = '0';
              }
              else{
              filtersState.maxSquareFeet = value.toString();
              }
              setFiltersState(filtersState);
            }} defaultValue={filtersState.maxSquareFeet}/>
        </View>
        <Text style={{
            marginBottom: '1%',
            fontSize: 20
        }}>No. of Beds</Text>    
        <View style={{
            justifyContent: 'space-evenly',
            flexDirection: 'row',
            width: '100%',
            marginBottom: '3%'
        }}>
            <TextInput placeholder='Minimum' keyboardType="number-pad" style={{
                width: '30%',
                fontSize: 20,
                borderRadius: 5,
                padding: 5,
                borderWidth: 1,

            }} onChangeText={(event)=>{
              const value = parseInt(event);
              if(isNaN(value))
              {
              filtersState.minBeds = '0';
              }
              else{
              filtersState.minBeds = value.toString();
              }
              setFiltersState(filtersState);
            }} defaultValue={filtersState.minBeds}/>
                        <TextInput placeholder='Maximum' keyboardType="number-pad" style={{
                width: '30%',
                fontSize: 20,
                borderRadius: 5,
                padding: 5,
                borderWidth: 1,

            }} onChangeText={(event)=>{
              const value = parseInt(event);
              if(isNaN(value))
              {
              filtersState.maxBeds = '0';
              }
              else{
              filtersState.maxBeds = value.toString();
              }
              setFiltersState(filtersState);
            }} defaultValue={filtersState.maxBeds}/>
    
        </View>
        <Text style={{
            marginBottom: '1%',
            fontSize: 20
        }}>No. of Baths</Text>    
        <View style={{
            justifyContent: 'space-evenly',
            flexDirection: 'row',
            width: '100%',
            marginBottom: '3%'
        }}>
            <TextInput placeholder='Minimum' keyboardType="number-pad" style={{
                width: '30%',
                fontSize: 20,
                borderRadius: 5,
                padding: 5,
                borderWidth: 1,

            }} onChangeText={(event)=>{
              const value = parseInt(event);
              if(isNaN(value))
              {
              filtersState.minBaths = '0';
              }
              else{
              filtersState.minBaths = value.toString();
              }
              setFiltersState(filtersState);
            }} defaultValue={filtersState.minBaths}/>
                        <TextInput placeholder='Maximum' keyboardType="number-pad" style={{
                width: '30%',
                fontSize: 20,
                borderRadius: 5,
                padding: 5,
                borderWidth: 1,

            }} onChangeText={(event)=>{
              const value = parseInt(event);
              if(isNaN(value))
              {
              filtersState.maxBaths = '0';
              }
              else{
              filtersState.maxBaths = value.toString();
              }
              setFiltersState(filtersState);
            }} defaultValue={filtersState.maxBaths}/>
    
        </View>
        <TouchableOpacity onPress={()=>{
          console.log(mapState);
        }}>
          <Text>Check State</Text>
        </TouchableOpacity>
        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  navigateButtonStyles: {
    marginTop: '5%',
  },
});

export default FilterHomes;

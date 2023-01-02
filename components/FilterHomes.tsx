import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, View} from 'react-native';
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
  navigation: any;
}> = ({navigation}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigateToMap = () => {
    navigation.navigate('Map');
  };

  const [housingType, setHousingType] = useState('0');
  const [minPrice,setMinPrice]=useState(500);
  const [maxPrice,setMaxPrice]=useState(1000);

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
                    onValueChange={newValue =>
                      (HousingTypeValues[type] = newValue)
                    }

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
                  setMinPrice(0);
                }
                else{
                  setMinPrice(value);
                }
            }} value={minPrice}/>
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
                  setMaxPrice(0);
                }
                else{
                  setMaxPrice(value);
                }
            }} value={maxPrice}/>
    
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
                  setMinPrice(0);
                }
                else{
                  setMinPrice(value);
                }
            }} value={minPrice}/>
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
                  setMaxPrice(0);
                }
                else{
                  setMaxPrice(value);
                }
            }} value={maxPrice}/>
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
                  setMinPrice(0);
                }
                else{
                  setMinPrice(value);
                }
            }} value={minPrice}/>
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
                  setMaxPrice(0);
                }
                else{
                  setMaxPrice(value);
                }
            }} value={maxPrice}/>
    
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
                  setMinPrice(0);
                }
                else{
                  setMinPrice(value);
                }
            }} value={minPrice}/>
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
                  setMaxPrice(0);
                }
                else{
                  setMaxPrice(value);
                }
            }} value={maxPrice}/>
    
        </View>
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

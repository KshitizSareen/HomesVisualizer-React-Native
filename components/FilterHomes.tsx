import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
const HousingTypesArray = [
  ['Apartment', 'Condo', 'Manufactured', 'Duplex', 'Townhouse', 'Loft'],
  ['House', 'Cottage/Cabin', 'Flat', 'In-law', 'Land', 'Assisted Living'],
];

const FilterHomes: React.FC<{
  route: any;
  navigation: any;
}> = ({route}) => {
  const {
    filtersState,
    setFiltersState,
    setResults,
    setResultsData,
    setChartData,
  } = route.params;

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.headerStyle}>Housing Types</Text>
      <View style={styles.hosuingOptionsView}>
        {HousingTypesArray.map((typeArray, typeArrayIndex) => {
          return (
            <View style={styles.housingOptionsRowView} key={typeArrayIndex}>
              {typeArray.map((type, typeIndex) => {
                return (
                  <View style={styles.optionSetView} key={typeIndex}>
                    <CheckBox
                      disabled={false}
                      onValueChange={newValue => {
                        filtersState.housingTypes[type] = newValue;
                        setFiltersState(filtersState);
                      }}
                      value={filtersState.housingTypes[type]}
                    />
                    <Text style={styles.optionSetText}>{type}</Text>
                  </View>
                );
              })}
            </View>
          );
        })}
      </View>
      <Text style={styles.headerStyle}>Price</Text>
      <View style={styles.textInputStyles}>
        <TextInput
          placeholder="Minimum"
          keyboardType="number-pad"
          style={styles.textInputStyle}
          onChangeText={event => {
            const value = parseInt(event, 10);
            if (isNaN(value)) {
              filtersState.minPrice = '0';
            } else {
              filtersState.minPrice = value.toString();
            }
            setFiltersState(filtersState);
          }}
          defaultValue={filtersState.minPrice}
        />
        <TextInput
          placeholder="Maximum"
          keyboardType="number-pad"
          style={styles.textInputStyle}
          onChangeText={event => {
            const value = parseInt(event, 10);
            if (isNaN(value)) {
              filtersState.maxPrice = '0';
            } else {
              filtersState.maxPrice = value.toString();
            }
            setFiltersState(filtersState);
          }}
          defaultValue={filtersState.maxPrice}
        />
      </View>
      <Text style={styles.headerStyle}>Square Feet</Text>
      <View style={styles.textInputStyles}>
        <TextInput
          placeholder="Minimum"
          keyboardType="number-pad"
          style={styles.textInputStyle}
          onChangeText={event => {
            const value = parseInt(event, 10);
            if (isNaN(value)) {
              filtersState.minSquareFeet = '0';
            } else {
              filtersState.minSquareFeet = value.toString();
            }
            setFiltersState(filtersState);
          }}
          defaultValue={filtersState.minSquareFeet}
        />
        <TextInput
          placeholder="Maximum"
          keyboardType="number-pad"
          style={styles.textInputStyle}
          onChangeText={event => {
            const value = parseInt(event, 10);
            if (isNaN(value)) {
              filtersState.maxSquareFeet = '0';
            } else {
              filtersState.maxSquareFeet = value.toString();
            }
            setFiltersState(filtersState);
          }}
          defaultValue={filtersState.maxSquareFeet}
        />
      </View>
      <Text style={styles.headerStyle}>No. of Beds</Text>
      <View style={styles.textInputStyles}>
        <TextInput
          placeholder="Minimum"
          keyboardType="number-pad"
          style={styles.textInputStyle}
          onChangeText={event => {
            const value = parseInt(event, 10);
            if (isNaN(value)) {
              filtersState.minBeds = '0';
            } else {
              filtersState.minBeds = value.toString();
            }
            setFiltersState(filtersState);
          }}
          defaultValue={filtersState.minBeds}
        />
        <TextInput
          placeholder="Maximum"
          keyboardType="number-pad"
          style={styles.textInputStyle}
          onChangeText={event => {
            const value = parseInt(event, 10);
            if (isNaN(value)) {
              filtersState.maxBeds = '0';
            } else {
              filtersState.maxBeds = value.toString();
            }
            setFiltersState(filtersState);
          }}
          defaultValue={filtersState.maxBeds}
        />
      </View>
      <Text style={styles.headerStyle}>No. of Baths</Text>
      <View style={styles.textInputStyles}>
        <TextInput
          placeholder="Minimum"
          keyboardType="number-pad"
          style={styles.textInputStyle}
          onChangeText={event => {
            const value = parseInt(event, 10);
            if (isNaN(value)) {
              filtersState.minBaths = '0';
            } else {
              filtersState.minBaths = value.toString();
            }
            setFiltersState(filtersState);
          }}
          defaultValue={filtersState.minBaths}
        />
        <TextInput
          placeholder="Maximum"
          keyboardType="number-pad"
          style={styles.textInputStyle}
          onChangeText={event => {
            const value = parseInt(event, 10);
            if (isNaN(value)) {
              filtersState.maxBaths = '0';
            } else {
              filtersState.maxBaths = value.toString();
            }
            setFiltersState(filtersState);
          }}
          defaultValue={filtersState.maxBaths}
        />
      </View>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => {
          setResults(setResultsData);
          setChartData();
        }}>
        <Text style={styles.buttonText}>Apply Filters</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navigateButtonStyles: {
    marginTop: '5%',
  },
  scrollViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerStyle: {
    marginBottom: '3%',
    fontSize: 20,
    marginTop: '1%',
  },
  hosuingOptionsView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: '3%',
  },
  housingOptionsRowView: {
    justifyContent: 'space-between',
  },
  optionSetView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '3%',
  },
  optionSetText: {
    marginLeft: '5%',
    fontSize: 20,
  },
  textInputStyles: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    width: '100%',
    marginBottom: '3%',
  },
  textInputStyle: {
    width: '30%',
    fontSize: 20,
    borderRadius: 5,
    padding: 5,
    borderWidth: 1,
  },
  buttonStyle: {
    backgroundColor: 'darkblue',
    padding: '2%',
    borderRadius: 10,
    marginTop: '5%',
  },
  buttonText: {
    color: 'lightblue',
    fontSize: 22.5,
  },
});

export default FilterHomes;

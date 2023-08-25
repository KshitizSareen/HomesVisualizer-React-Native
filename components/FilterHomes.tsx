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

type FiltersState = {
  // Assuming filtersState could be something like this as an example
  startDate: Date;
  endDate: Date;
  location: string;
  // Add other filters as necessary
};

type Home = {
  id: number;
  title: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  imageUrl: string;
  // ... other properties
};

type Results = {
  items: Array<Home>;
};

const FilterCheckbox = ({ type, filtersState, setFiltersState }) => (
  <View style={styles.optionSetView}>
    <CheckBox
      disabled={false}
      onValueChange={(newValue) => {
        filtersState.housingTypes[type] = newValue;
        setFiltersState({ ...filtersState });
      }}
      value={filtersState.housingTypes[type]}
    />
    <Text style={styles.optionSetText}>{type}</Text>
  </View>
);

const FilterInput = ({ placeholder, attribute, filtersState, setFiltersState }) => (
  <TextInput
    placeholder={placeholder}
    keyboardType="number-pad"
    style={styles.textInputStyle}
    onChangeText={(event) => {
      const value = parseInt(event, 10);
      filtersState[attribute] = isNaN(value) ? '0' : value.toString();
      setFiltersState({ ...filtersState });
    }}
    defaultValue={filtersState[attribute]}
  />
);

const FilterHomes: React.FC<{
  route: RouteProp;
}> = ({ route: { params } }) => {
  const {
    filtersState,
    setFiltersState,
    setResults,
    setResultsData,
    setChartData
  } = params;

  return (
<SafeAreaView style={styles.root}>
    <Text style={styles.headerStyle}>Housing Types</Text>
    <View style={styles.housingOptionsView}>
      {HousingTypesArray.map((typeArray, typeArrayIndex) => (
        <View style={styles.housingOptionsRowView} key={typeArrayIndex}>
          {typeArray.map((type, typeIndex) => (
            <FilterCheckbox
              key={typeIndex}
              type={type}
              filtersState={filtersState}
              setFiltersState={setFiltersState}
            />
          ))}
        </View>
      ))}
    </View>

    {['Price', 'Square Feet', 'No. of Beds', 'No. of Baths'].map((header, index) => (
      <React.Fragment key={index}>
        <Text style={styles.headerStyle}>{header}</Text>
        <View style={styles.textInputStyles}>
          <FilterInput
            placeholder="Minimum"
            attribute={`min${header.replace(/ /g, '')}`}
            filtersState={filtersState}
            setFiltersState={setFiltersState}
          />
          <FilterInput
            placeholder="Maximum"
            attribute={`max${header.replace(/ /g, '')}`}
            filtersState={filtersState}
            setFiltersState={setFiltersState}
          />
        </View>
      </React.Fragment>
    ))}

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



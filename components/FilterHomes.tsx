import React from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';

const FilterHomes: React.FC<{
  navigation: any;
}> = ({navigation}) => {
  const navigateToMap = () => {
    navigation.navigate('Map');
  };

  return (
    <SafeAreaView style={styles.root}>
      <Text>Filter Homes</Text>
      <TouchableOpacity
        style={styles.navigateButtonStyles}
        onPress={navigateToMap}>
        <Text>Go to Map</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigateButtonStyles: {
    marginTop: '5%',
  },
});

export default FilterHomes;

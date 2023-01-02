import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const Map: React.FC<{
  navigation: any;
}> = ({navigation}) => {
  const navigateToProperties = () => {
    navigation.navigate('DisplayProperties');
  };
  return (
    <SafeAreaView style={styles.root}>
      <Text>Map Component</Text>
      <TouchableOpacity
        style={styles.navigateButtonStyles}
        onPress={navigateToProperties}>
        <Text>Go to Properties</Text>
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

export default Map;

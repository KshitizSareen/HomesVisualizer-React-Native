import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

const CreateHomes: React.FC = () => {
  return (
    <SafeAreaView style={styles.root}>
      <Text>Create Homes</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CreateHomes;

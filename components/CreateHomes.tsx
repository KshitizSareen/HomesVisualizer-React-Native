import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const CreateHomes: React.FC = () => {
  const [housingType, setHousingType] = useState('0');

  return (
    <SafeAreaView style={styles.root}>
      <Picker
        selectedValue={housingType}
        onValueChange={housingTypeValue => {
          setHousingType(housingTypeValue);
        }}
        style={styles.pickerStyle}>
        <Picker.Item label="Apartment" value="0" />
        <Picker.Item label="Condo" value="1" />
        <Picker.Item label="House" value="2" />
        <Picker.Item label="Duplex" value="3" />
        <Picker.Item label="Townhouse" value="4" />
        <Picker.Item label="Loft" value="5" />
        <Picker.Item label="Manufactured" value="6" />
        <Picker.Item label="Cottage/Cabin" value="7" />
        <Picker.Item label="Flat" value="8" />
        <Picker.Item label="In-law" value="9" />
        <Picker.Item label="Land" value="10" />
        <Picker.Item label="Assisted Living" value="11" />
      </Picker>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerStyle: {
    width: '90%',
  },
});

export default CreateHomes;

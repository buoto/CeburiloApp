import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLOR_PRIMARY, COLOR_SECONDARY } from '/app/config/styles';

export default class LocationForm extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TextInput placeholder="Od" style={styles.addressInput} />
        <TextInput placeholder="Do" style={styles.addressInput} />
        <Button title="Znajdż trasę" color={COLOR_PRIMARY} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  addressInput: {
    alignSelf: 'stretch',
    margin: 10,
    marginLeft: 40,
    marginRight: 40,
  },
  searchButton: {
    backgroundColor: COLOR_PRIMARY,
  },
});

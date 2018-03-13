import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLOR_PRIMARY, COLOR_SECONDARY } from '/app/config/styles';

export default class LocationForm extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TextInput placeholder="Od" />
        <TextInput placeholder="Do" />
        <Button title="Znajdż trasę" />
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
});

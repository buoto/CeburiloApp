import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';

import RNGooglePlaces from 'react-native-google-places';
import Icon from 'react-native-vector-icons/FontAwesome';

import { COLOR_GREY, COLOR_GREY_DARK } from '/app/config/styles';
import { defaultInitialRegion } from '/app/config/consts';
import { locationType } from '/app/models';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    backgroundColor: COLOR_GREY,

    borderBottomColor: COLOR_GREY_DARK,
    borderBottomWidth: StyleSheet.hairlineWidth,

    height: 60,
  },
  location: {
    alignSelf: 'stretch',
    flex: 1,
    paddingLeft: 20,
    justifyContent: 'center',
  },
  locationText: {
    fontSize: 16,
  },
  currentLocation: {
    alignSelf: 'stretch',
    padding: 20,
  },
});

class LocationInput extends Component {
  static defaultProps = {
    placeholder: '',
    onChange: () => {},
    location: { name: '' },
    locationAccess: false,
    requestPermission: () => {},
  };

  static propTypes = {
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    location: locationType,
    locationAccess: PropTypes.bool,
    requestPermission: PropTypes.func,
  };

  getCurrentLocation = () => {
    const { onChange, locationAccess, requestPermission } = this.props;
    if (locationAccess) {
      RNGooglePlaces.getCurrentPlace().then(([place]) => onChange(place));
      // .catch(error => console.log(error)); TODO handle error
    } else {
      requestPermission();
    }
  };
  openSearchModal = () => {
    const { onChange } = this.props;
    RNGooglePlaces.openAutocompleteModal(defaultInitialRegion).then(place => {
      onChange(place);
    });
    // .catch(error => console.log(error)); TODO handle error
  };

  render() {
    const { placeholder, location: { name } } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.location}
          onPress={this.openSearchModal}
        >
          <Text style={styles.locationText}>{name || placeholder}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.currentLocation}
          onPress={this.getCurrentLocation}
        >
          <Icon name="crosshairs" size={20} style={styles.getLocation} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default LocationInput;

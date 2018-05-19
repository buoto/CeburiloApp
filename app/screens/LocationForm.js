import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

import MapView, { Marker } from 'react-native-maps';
import { FloatingAction } from 'react-native-floating-action';
import Icon from 'react-native-vector-icons/FontAwesome';

import { COLOR_WHITE, COLOR_PRIMARY } from '/app/config/styles';
import { initialRegion } from '/app/config/consts';
import LocationInput from '/app/components/LocationInput';

const actions = [
  {
    text: 'Start',
    name: 'start',
    position: 1,
    icon: <Icon name="flag" color={COLOR_WHITE} />,
    color: COLOR_PRIMARY,
  },
  {
    text: 'Cel',
    name: 'end',
    position: 1,
    icon: <Icon name="flag-checkered" color={COLOR_WHITE} />,
    color: COLOR_PRIMARY,
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_WHITE,
  },
  form: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputs: {
    alignSelf: 'stretch',
  },
  map: {
    flex: 1,
    alignSelf: 'stretch',
    zIndex: 0,
  },
  searchButton: {
    position: 'absolute',
    bottom: -25,
  },
});

export default class LocationForm extends React.Component {
  constructor() {
    super();
    this.state = {
      touchedLocation: {},
    };
  }
  locationSetter = key => ({ name, latitude, longitude }) => {
    this.setState({ [key]: { name, latitude, longitude } });
  };

  mapChangeLocation = ({ nativeEvent: { coordinate } }) => {
    this.floatingAction.animateButton();
    this.setState({ touchedLocation: coordinate });
  };

  handleAction = name => {
    const { touchedLocation: { latitude, longitude } } = this.state;
    const location = {
      latitude,
      longitude,
      name: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
    };
    this.locationSetter(name)(location);
  };

  render() {
    const { start, end } = this.state;

    const buttonVisible = start && end;

    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={styles.inputs}>
            <LocationInput
              placeholder="Start"
              location={start}
              onChange={this.locationSetter('start')}
            />
            <LocationInput
              placeholder="Cel"
              location={end}
              onChange={this.locationSetter('end')}
            />
          </View>
          <View style={styles.searchButton}>
            {buttonVisible && (
              <Button
                title="Znajdż trasę"
                color={COLOR_PRIMARY}
                onPress={() => {}}
              />
            )}
          </View>
        </View>
        <MapView
          style={styles.map}
          initialRegion={initialRegion}
          onLongPress={this.mapChangeLocation}
        >
          {start && <Marker coordinate={start} title="Start" />}
          {end && <Marker coordinate={end} title="Koniec" />}
        </MapView>
        <FloatingAction
          ref={ref => {
            this.floatingAction = ref;
          }}
          actions={actions}
          visible={false}
          onPressItem={this.handleAction}
        />
      </View>
    );
  }
}

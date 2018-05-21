import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';

import { COLOR_WHITE, COLOR_PRIMARY } from '/app/config/styles';
import { initialRegion } from '/app/config/consts';
import LocationInput from '/app/components/LocationInput';
import FloatingAction from '/app/components/FloatingAction';

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
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    zIndex: 100,
  },
});

export default class LocationForm extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  locationSetter = key => ({ name, latitude, longitude }, extra) => {
    this.setState({ [key]: { name, latitude, longitude }, ...extra });
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
    this.locationSetter(name)(location, { touchedLocation: undefined });
  };

  render() {
    const { start, end, touchedLocation } = this.state;

    const buttonVisible = start && end && !touchedLocation;

    return (
      <View style={styles.container}>
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
        <View>
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
          {touchedLocation && (
            <Marker coordinate={touchedLocation} title="Wybrana lokalizacja" />
          )}
        </MapView>
        <FloatingAction
          ref={ref => {
            this.floatingAction = ref;
          }}
          actions={actions}
          visible={false}
          onPressItem={this.handleAction}
          onReset={() => this.setState({ touchedLocation: undefined })}
        />
      </View>
    );
  }
}

import React from 'react';
import { Marker } from 'react-native-maps';

import { MANY_BIKES_COUNT } from '/app/config/consts';
import {
  COLOR_SECONDARY_DARK,
  COLOR_RED,
  COLOR_BLUE,
  COLOR_PURPLE,
} from '/app/config/styles';

const getStationTitle = ({ name, number }) => `${name} ${number}`;

const getStationDescription = ({ bikeCount, maintenance }) => {
  if (bikeCount === undefined) {
    return undefined;
  }
  if (maintenance) {
    return 'Stacja nieczynna';
  }

  return bikeCount === 0 ? 'Brak rowerów!' : `Dostępne rowery: ${bikeCount}`;
};

const getStationColor = ({ maintenance, bikeCount }) => {
  if (maintenance) {
    return COLOR_PURPLE;
  }

  if (bikeCount === 0) {
    return COLOR_RED;
  }

  return bikeCount < MANY_BIKES_COUNT ? COLOR_SECONDARY_DARK : COLOR_BLUE;
};

const StationMarker = station => (
  <Marker
    key={station.number}
    coordinate={station.location}
    title={getStationTitle(station)}
    description={getStationDescription(station)}
    pinColor={getStationColor(station)}
  />
);

export default StationMarker;

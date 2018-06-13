import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

import { COLOR_WHITE } from '/app/config/styles';
import { sum, unique } from '/app/utils';

const stationNames = completedRoutes =>
  completedRoutes
    .map(({ stations }) => stations.map(({ name }) => name))
    .reduce((prev, next) => [...prev, ...next], []);

const favoriteStation = names =>
  Object.entries(
    names.reduce(
      (prev, cur) => ({
        ...prev,
        [cur]: (prev[cur] || 0) + 1,
      }),
      {},
    ),
  ).reduce(
    (prev, [name, count]) => (count > prev.count ? { name, count } : prev),
    { count: -1 },
  );

const tripPrice = time => {
  const mins = time / 60000;

  let price = 0;
  if (mins < 20) return price;
  price += 1;
  if (mins < 60) return price;

  price += 3;
  if (mins < 2 * 60) return price;
  price += 5;
  if (mins < 3 * 60) return price;
  price += 7;
  if (mins < 4 * 60) return price;
  price += 7;
  if (mins < 5 * 60) return price;
  price += 7;
  if (mins < 6 * 60) return price;
  price += 7;
  return price;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLOR_WHITE,
  },
  name: {
    fontSize: 18,
  },
  value: {
    fontSize: 22,
  },
  savedMoneyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  savedMoneyName: {
    fontSize: 36,
  },

  savedMoney: {
    fontSize: 72,
  },
});

const getStat = (name, value) => (
  <View style={styles.subContainer}>
    <Text style={styles.name}>{name}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const Stats = ({ completedRoutes }) => {
  const names = stationNames(completedRoutes);
  const visitedStations = unique(names);
  const distanceSum = sum('distance')(completedRoutes);
  const { name, count } = favoriteStation(names);
  const timeSum = sum('time')(completedRoutes);
  const savedMoney = completedRoutes.reduce(
    (s, { time }) => s + tripPrice(time),
    0,
  );

  return (
    <View style={styles.container}>
      <View style={styles.subContainer} />
      {getStat('Liczba ukończonych tras', completedRoutes.length)}

      {getStat('Liczba odwiedzonych stacji', visitedStations.length)}

      {name && count && getStat('Ulubiona stacja', `${name} (${count})`)}

      {getStat('Przejechany dystans', `${(distanceSum / 1000).toFixed(2)} km`)}

      {getStat('Łączny czas podróży', `${(timeSum / 60000).toFixed(0)} minut`)}

      <View style={styles.savedMoneyContainer}>
        <View style={styles.subContainer}>
          <Text style={styles.savedMoneyName}>Zaoszczędzono</Text>
          <Text style={styles.savedMoney}>{savedMoney}zł</Text>
        </View>
      </View>
    </View>
  );
};

Stats.propTypes = {
  completedRoutes: PropTypes.arrayOf(PropTypes.shape()),
};

Stats.defaultProps = {
  completedRoutes: [],
};

export default Stats;

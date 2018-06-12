import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { COLOR_WHITE } from '/app/config/styles';

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

const Stats = ({
  completedRoutes,
  visitedStations,
  distanceSum,
  timeSum,
  favoriteStation: { name, count },
  savedMoney,
}) => (
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

Stats.propTypes = {
  completedRoutes: PropTypes.arrayOf(PropTypes.shape()),
  visitedStations: PropTypes.arrayOf(PropTypes.string),
  distanceSum: PropTypes.number,
  timeSum: PropTypes.number,
  savedMoney: PropTypes.number,
  favoriteStation: PropTypes.shape({
    name: PropTypes.string,
    count: PropTypes.number,
  }),
};

Stats.defaultProps = {
  completedRoutes: [],
  visitedStations: [],
  distanceSum: 0,
  timeSum: 0,
  favoriteStation: {},
  savedMoney: 0,
};

export default Stats;

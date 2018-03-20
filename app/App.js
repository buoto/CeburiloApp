import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import { ROUTES, INITIAL_ROUTE } from './config/routes';
import { COLOR_WHITE, COLOR_PRIMARY } from './config/styles';

import logo from './assets/logo.png';

const styles = StyleSheet.create({
  tabs: {
    backgroundColor: COLOR_PRIMARY,
  },
  indicator: {
    backgroundColor: COLOR_WHITE,
  },
  hamburger: {
    padding: 12,
    color: COLOR_WHITE,
  },
  logo: {
    width: 22,
    margin: 10,
  },
  header: {
    backgroundColor: COLOR_PRIMARY,
  },
  headerTitle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 80,
  },
  headerText: {
    color: COLOR_WHITE,
    fontSize: 22,
  },
});

// TODO: Handle hamburger touches, see: https://github.com/react-navigation/react-navigation/issues/1539#issuecomment-301870732
// TODO: Refactor below!
export default StackNavigator({
  Root: {
    screen: TabNavigator(ROUTES, {
      tabBarOptions: { style: styles.tabs, indicatorStyle: styles.indicator },
      initialRouteName: INITIAL_ROUTE,
    }),
    navigationOptions: () => ({
      headerStyle: styles.header,
      headerTitle: (
        <View style={styles.headerTitle}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
          <Text style={styles.headerText}>Ceburilo</Text>
        </View>
      ),
      headerLeft: <Icon name="bars" size={20} style={styles.hamburger} />,
    }),
  },
});

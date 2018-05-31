import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { createStackNavigator, createTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import { COLOR_WHITE, COLOR_PRIMARY } from '/app/config/styles';

import Foo from '/app/screens/Foo';
import Form from '/app/screens/Form';
import StationsMap from '/app/screens/StationsMap';
import Result from '/app/screens/Result';
import HeaderTitle from '/app/components/HeaderTitle';

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
  header: {
    backgroundColor: COLOR_PRIMARY,
  },
  headerText: {
    color: COLOR_WHITE,
    fontSize: 22,
  },
});

const TabNavigator = createTabNavigator(
  {
    Statystyki: { screen: Foo },
    Trasy: { screen: Form },
    Stacje: { screen: StationsMap },
  },
  {
    tabBarOptions: { style: styles.tabs, indicatorStyle: styles.indicator },
    disableKeyboardHandling: true,
    initialRouteName: 'Trasy',
  },
);

// TODO: Handle hamburger touches, see: https://github.com/react-navigation/react-navigation/issues/1539#issuecomment-301870732
// TODO: Refactor below!
const RootNavigator = createStackNavigator(
  {
    Root: {
      screen: TabNavigator,
      navigationOptions: () => ({
        headerStyle: styles.header,
        headerTitle: HeaderTitle,
        headerLeft: <Icon name="bars" size={20} style={styles.hamburger} />,
      }),
    },
    Result: {
      screen: Result,
      navigationOptions: () => ({
        headerTitle: <Text style={styles.headerText}>Optymalna trasa</Text>,
        headerStyle: styles.header,
        headerTintColor: COLOR_WHITE,
      }),
    },
  },
  {
    disableKeyboardHandling: true,
  },
);

export default RootNavigator;

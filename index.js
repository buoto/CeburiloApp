import { Navigation } from 'react-native-navigation';

import { registerScreens } from './screens';
import { iconsLoaded, iconsMap } from './icons';

registerScreens(); // this is where you register all of your app's screens

const navigatorStyle = {
  statusBarColor: 'black',
  statusBarTextColorScheme: 'light',
  navigationBarColor: 'black',
  navBarBackgroundColor: '#0a0a0a',
  navBarTextColor: 'white',
  navBarButtonColor: 'white',
  tabBarButtonColor: 'red',
  tabBarSelectedButtonColor: 'red',
  tabBarBackgroundColor: 'white',
  topBarElevationShadowEnabled: false,
  navBarHideOnScroll: true,
  tabBarHidden: false,
  drawUnderTabBar: true,
};

console.warn('halo !!');
// start the app
//iconsLoaded.then(() => {
Navigation.startTabBasedApp({
  tabs: [
    {
      label: 'One',
      screen: 'ceburilo.App',
      navigatorStyle,
      //icon: iconsMap['ios-film'],
      icon: require('./ceburilo.png'),
      //selectedIcon: require('../img/one_selected.png'), // iOS only
      title: 'Screen One',
    },
    {
      label: 'One',
      screen: 'ceburilo.App',
      navigatorStyle,
      //icon: iconsMap['ios-film'],
      icon: require('./ceburilo.png'),
      //selectedIcon: require('../img/one_selected.png'), // iOS only
      title: 'Screen One',
    },
  ],
});
//});

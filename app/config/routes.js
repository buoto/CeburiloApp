import Foo from '/app/screens/Foo';
import LocationForm from '/app/screens/LocationForm';
import StationsMap from '/app/screens/StationsMap';

export const ROUTES = {
  Statystyki: { screen: Foo },
  Trasy: { screen: LocationForm },
  Stacje: { screen: StationsMap },
};

export const INITIAL_ROUTE = Object.keys(ROUTES)[1];

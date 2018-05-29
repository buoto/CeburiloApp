import Foo from '/app/screens/Foo';
import Form from '/app/screens/Form';
import StationsMap from '/app/screens/StationsMap';

export const ROUTES = {
  Statystyki: { screen: Foo },
  Trasy: { screen: Form },
  Stacje: { screen: StationsMap },
};

export const INITIAL_ROUTE = Object.keys(ROUTES)[1];

import Foo from '/app/screens/Foo';
import LocationForm from '/app/screens/LocationForm';

export const ROUTES = {
  Statystyki: { screen: Foo },
  Trasy: { screen: LocationForm },
  Stacje: { screen: Foo },
};

export const INITIAL_ROUTE = Object.keys(ROUTES)[1];

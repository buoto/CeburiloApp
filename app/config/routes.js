import Foo from '/app/screens/Foo';
import RouteForm from '/app/screens/RouteForm';
import StationsMap from '/app/screens/StationsMap';

export const ROUTES = {
  Statystyki: { screen: Foo },
  Trasy: { screen: RouteForm },
  Stacje: { screen: StationsMap },
};

export const INITIAL_ROUTE = Object.keys(ROUTES)[1];

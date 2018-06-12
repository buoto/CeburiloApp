import { connect } from 'react-redux';

import { sum, unique } from '/app/utils';
import Stats from '/app/components/Stats';

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

const tripPrice = ({ time }) => {
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

const mapStateToProps = ({ completedRoutes }) => {
  const names = stationNames(completedRoutes);
  return {
    completedRoutes,
    visitedStations: unique(names),
    distanceSum: sum('distance')(completedRoutes),
    favoriteStation: favoriteStation(names),
    timeSum: sum('time')(completedRoutes),
    savedMoney: completedRoutes.reduce((s, { time }) => s + tripPrice(time), 0),
  };
};

const CompletedStats = connect(mapStateToProps)(Stats);

export default CompletedStats;

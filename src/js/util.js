import _round from "lodash/round";
import _sum from "lodash/sum";

export const getSeasonPointTotal = (stats, settings) => {
  if (!settings || !stats) {
    return 0;
  }

  const pointArray = [];
  pointArray.push(stats.fumble * settings.pts_per_fumble);
  pointArray.push(stats.passing_int * settings.pts_per_passing_int);
  pointArray.push(stats.passing_td * settings.pts_per_passing_td);
  pointArray.push(stats.passing_yd * settings.pts_per_passing_yd);
  pointArray.push(stats.receiving_td * settings.pts_per_receiving_td);
  pointArray.push(stats.receiving_yd * settings.pts_per_receiving_yd);
  pointArray.push(stats.reception * settings.pts_per_reception);
  pointArray.push(stats.return_td * settings.pts_per_return_td);
  pointArray.push(stats.rushing_td * settings.pts_per_rushing_td);
  pointArray.push(stats.rushing_yd * settings.pts_per_rushing_yd);
  pointArray.push(stats.two_pt_made);

  const sum = _round(_sum(pointArray), 2);
  return sum;
};

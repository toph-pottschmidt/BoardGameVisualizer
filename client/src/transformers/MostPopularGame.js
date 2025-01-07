import { DefaultConfigProps } from "./";
import { computeColorByRelativeValue } from "../styles/colors";
import { easeOutBounce } from "./DefaultStyleTransformer";

export const MostPopularGameTransformer = (games = []) => {
  const gameMap = {};
  // compute total wins by player
  games.forEach((game, i) => {
    gameMap[game.game] = gameMap[game.game] ? gameMap[game.game] + 1 : 1
  })
  
  const sortedEntries = [];
  Object.keys(gameMap).forEach(key => {
    sortedEntries.push({
      name: key,
      value: gameMap[key]
    });
  });

  sortedEntries.sort((a, b) => b.value - a.value);
  // construct highcharts config based on sorted map entries
  const categories = [];
  const data = [];

  sortedEntries.forEach((entry, i) => {
    categories.push(entry.name);
    data.push({
      x: i,
      y: entry.value,
      color: computeColorByRelativeValue(i, 0, sortedEntries.length)
    });
  })

  const series = [{
    type: 'bar',
    data,
    animation: {
      duration: 2000,
      defer: 1000,
      easing: easeOutBounce,
    }
  }];

  const xAxis = {
    categories,
    opposite: true,
  }
  
  const yAxis = {
    tickInterval: 2,
    reversed: true,
    title: {
      text: ''
    }
  }

  const title = {
    text: 'Most Popular Games',
  }

  const chart = {
    animation: {
      duration: 2000,
      defer: 1000,
      easing: easeOutBounce,
    }
  }

  const tooltip = {
    enabled: false
  }

  return {
    chart,
    tooltip,
    series,
    title,
    xAxis,
    yAxis,
    ...DefaultConfigProps
  };
}
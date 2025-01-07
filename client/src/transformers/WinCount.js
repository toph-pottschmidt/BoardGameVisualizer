import { DefaultConfigProps } from "./DefaultStyleTransformer";
import { computeColorByRelativeValue } from "../styles/colors";

export const WinCountTransformer = (games = []) => {
  const winMap = {};
  // compute total wins by player
  games.forEach((game) => {
    const results = game.results.sort((a, b) => (a.score - b.score) * (game.lowestScoreWins ? 1 : -1))
    const gameWinners = results.filter(r => r.score === results[0].score).map(r => r.player)
    gameWinners.forEach(player => {
      winMap[player] = winMap[player] || []
      winMap[player].push(game.game)
    })
  });

  // sort categories/players by wins
  let sortedEntries = Object.keys(winMap).map(key => ({
    name: key,
    value: winMap[key].length,
    games: winMap[key]
  }))
  
  sortedEntries.sort((a, b) => b.value - a.value);
  sortedEntries = sortedEntries.slice(0, 15);
  // construct highcharts config based on sorted map entries
  const categories = [];
  const data = [];

  sortedEntries.forEach((entry, i) => {
    categories.push(entry.name);
    data.push({
      x: i,
      y: entry.value,
      color: computeColorByRelativeValue(sortedEntries.length - 1 - i, 0, sortedEntries.length),
      custom: {
        games: entry.games
      }
    });
  })

  const series = [{
    type: 'bar',
    data,
    animation: {
      duration: 2000,
      defer: 1000
    }
  }];

  const xAxis = {
    categories,
    opposite: true,
    labels: {
      enabled: true,
      step: 1,
      allowOverlap: true,
    }
  };
  
  const yAxis = {
    tickInterval: 2,
    reversed: true,
    title: {
      text: ''
    }
  }

  const chart = {
    animation: {
      duration: 2000,
      defer: 1000
    }
  }

  const title = {
    text: 'Total Wins'
  }

  const tooltip = {
    formatter() {
      return `<strong>${this.key}</strong><br/>${this.point.custom.games.join(', ')}`
    }
  }

  return {
    chart,
    tooltip,
    title,
    series,
    xAxis,
    yAxis,
    ...DefaultConfigProps
  };
}
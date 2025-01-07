import { DefaultConfigProps, easeOutBounce } from "./DefaultStyleTransformer";
import { COLORS } from "../styles/colors";

export const SimpleVictoryScreen = ([game]) => {
  const results = game.results.sort((a, b) => (a.score - b.score) * (game.lowestScoreWins ? 1 : -1))

  // const [first, last] = this.key.split(/\s/g)
  //       return `${first} ${last[0]}.`
  const data = results.map((g, i) => ({
    name: g.player.split(/\s/g)[0],
    y: g.score
  }))

  const config = {
    chart: {
      type: 'column',
      animation: {
        duration: 2000,
        easing: easeOutBounce,
      }
    },
    series: [{
      name: 'Score',
      data,
      dataLabels: {
        enabled: true,
        align: 'left',
        rotation: 90,
        overflow: "allow",
        y: 25,
        style: {
          fontSize: 20,
        },
        position: 'center',
        color: 'white',
        formatter(p) {
          return `${this.key} - ${this.y}`
        }
      },
      color: {
        linearGradient: {
          x1: 0,
          x2: 0,
          y1: 1,
          y2: 0,
        },
        stops: COLORS.map((c, i) => [i / (COLORS.length - 1), c])
      }
    }],
    xAxis: {
      gridLineWidth: 0,
      minorGridLineWidth: 0,
      minorTickLength: 0,
      tickLength: 0,
      lineWidth: 0,
      labels: {
        enabled: false,
      },
      // categories,
    },
    yAxis: {
      gridLineWidth: 0,
      minorGridLineWidth: 0,
      minorTickLength: 0,
      tickLength: 0,
      labels: {
        enabled: false,
      },
      title: {
        enabled: false,
      }
    },
    title: {
      text: `Congratulations, ${results[0].player}!`,
    },
    subtitle: {
      text: `You won a game of ${game.game}`
    },
    ...DefaultConfigProps
  };

  return config;
};
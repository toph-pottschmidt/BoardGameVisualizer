import { DefaultConfigProps } from "./DefaultStyleTransformer";
import { computeColorByRelativeValue, COLORS } from "../styles/colors";

export const SocialNetworkTransformer = (games = []) => {
  let data = []
  let playerMap = {}
  games.forEach((g, i) => {
    const players = []
    g.results.forEach((r) => {
      players.push(r.player)
      playerMap[r.player] = (playerMap[r.player] + 1) || 1
    })

    const playerPairs = players.map((p1, i) => players.slice(i + 1).map(p2 => [p1, p2])).flat()
    data = data.concat(playerPairs)
  })

  const min = Math.min(...Object.values(playerMap))
  const max = Math.max(...Object.values(playerMap))

  const nodes = Object.entries(playerMap).map(([key, value]) => ({
    name: key,
    mass: 50,
    dataLabels: key,
    id: key,
    color: computeColorByRelativeValue(value, min, max),
    marker: {
      radius: 2 + value,
    }
  }))

  const series = [{
    data,
    nodes,
    events: {
      afterUpdate() { this.nodes = [] },
    },
    link: {
      color: {
        linearGradient: {
          x1: 0,
          x2: 1,
          y1: 0,
          y2: 0,
        },
        stops: COLORS.map((c, i) => [i / (COLORS.length - 1), c])
      }
    },
    dataLabels: {
      enabled: true,
      linkFormat: '',
      allowOverlap: true,
      formatter(){
        const [first, last] = this.key.split(/\s/g)
        return `${first} ${last[0]}.`
      }
    }
  }];

  const xAxis = {
  }

  const title = {
    text: "Social Networking",
  }

  const chart = {
    type: 'networkgraph',
  }
  
  const plotOptions = {
    networkgraph: {
      keys: ['from', 'to'],
      layoutAlgorithm: {
        enableSimulation: true,
        friction: -0.80,
        linkLength: 13,
        // gravitationalConstant: 0.1875,
        initialPositions: "random",
      }
    },
  }

  const tooltip = {
    enabled: false,
  }

  return {
    tooltip,
    series,
    xAxis,
    title,
    chart,
    plotOptions,
    ...DefaultConfigProps
  }
}
import { DefaultConfigProps, easeOutBounce } from "./DefaultStyleTransformer";
import { computeColorByRelativeValue, COLORS } from "../styles/colors";

export const GamesPlayedTransformer = (games = []) => {

  const roundTimestamp = t => new Date(Math.floor(t.getTime() / 300000) * 300000)

  const data = games.map((g, i) => ({
    x: roundTimestamp(g.timestamp),
    y: i + 1,
    name: g.game,
    custom: {
      results: g.results
    }
  }))

  const min = Math.min(...data.map(d => d.x.getTime()))
  const max = Math.max(...data.map(d => d.x.getTime()))
  

  data.forEach(d => {
    d.color = computeColorByRelativeValue(d.x.getTime(), min, max)
  })

  const series = [{
    type: 'line',
    data,
    step: "left",
    lineWidth: 6,
    color: {
      linearGradient: {
        x1: 0,
        x2: 1,
        y1: 0,
        y2: 0,
      },
      stops: COLORS.map((c, i) => [i / (COLORS.length - 1), c])
    },
    animation: {
      duration: 2000,
      defer: 1000,
      easing: easeOutBounce,
    },
  }];

  const xAxis = {
    type: 'datetime',
  }

  const yAxis = {
    title: {
      // text: 'Games',
      text: ''
    },
    minorGridLineWidth: 0,
    gridLineWidth: 1,
    tickInterval: 10,
  }

  const title = {
    text: "Total Games Played",
  }

  const chart = {
    animation: {
      duration: 2000,
      defer: 1000,
      easing: easeOutBounce,
    }
  }

  const plotOptions = {
    line: {
      findNearestPointBy: 'xy'
    }
  }
  const namesPerLine = 4
  const tooltip = {
    formatter(p) {
      let tooltip = `<strong>${this.key}</strong><br/>`
      const results = this.point.custom.results
      const lines = Math.ceil(results.length / namesPerLine)
      for (let i = 0; i < lines; i += 1) {

        tooltip += results.slice(i * namesPerLine, (i + 1) * namesPerLine).map(
          (r) => `<em>${r.player}</em>`
        ).join(', ') + "<br/>"
      }
      return tooltip
    }
  }

  return {
    tooltip,
    plotOptions,
    chart,
    series,
    xAxis,
    yAxis,
    title,
    ...DefaultConfigProps
  }
}
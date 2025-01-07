export const PALE_ORANGE = "#FFBB7C"
export const LIGHT_ORANGE = "#FFA477"
export const ORANGE = "#ED7855"
export const RUST = "#B85C4F"
export const LIGHT_PURPLE = "#AC6D7E"
export const DARK_PURPLE = "#63465A"

export const COLORS = [
  PALE_ORANGE,
  LIGHT_ORANGE,
  ORANGE,
  RUST,
  LIGHT_PURPLE,
  DARK_PURPLE
]

export const GRADIENTS = COLORS.slice(0, COLORS.length - 1).map((c, i) => [c, COLORS[i + 1]])

const hexToRGB = (hex) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
  ] : null;
};

const RGBToHex = (rgb) => "#" + ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1);

export const computeColorByRelativeValue = (value, min, max) => {
  let percentile = (value - min) / (max - min)
  if (isNaN(percentile)) {
    percentile = 0
  }
  const gradientIndex = Math.min(Math.floor(percentile * GRADIENTS.length), GRADIENTS.length - 1)

  const shiftFactor = percentile < 1 ? percentile * GRADIENTS.length % 1 : 1

  const gradientToUse = GRADIENTS[gradientIndex || 0]

  const [r0, g0, b0] = hexToRGB(gradientToUse[0])
  const [r1, g1, b1] = hexToRGB(gradientToUse[1])

  const result = RGBToHex([
    r0 + (r1 - r0) * shiftFactor,
    g0 + (g1 - g0) * shiftFactor,
    b0 + (b1 - b0) * shiftFactor,
  ].map(Math.floor))

  return result
}

export const getColorAxis = () => ({
  stops: COLORS.map((c, i) => [i / (COLORS.length - 1), c])
})
export function normalizeColor(color) {
  return `rgb(${color.r * 256}, ${color.g * 256}, ${color.b * 256})`;
}

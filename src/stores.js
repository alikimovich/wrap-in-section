import { readable } from "svelte/store";

export const colors = readable([
  {
    name: "violet",
    fills: { r: 0.93, g: 0.89, b: 1.0 },
    stroke: { r: 0.59, g: 0.28, b: 1.0 },
  },
  {
    name: "blue",
    fills: { r: 0.86, g: 0.94, b: 1.0 },
    stroke: { r: 0.05, g: 0.6, b: 1.0 },
  },
  {
    name: "green",
    fills: { r: 0.86, g: 0.95, b: 0.9 },
    stroke: { r: 0.08, g: 0.68, b: 0.36 },
  },
  {
    name: "yellow",
    fills: { r: 1.0, g: 0.96, b: 0.87 },
    stroke: { r: 1.0, g: 0.8, b: 0.16 },
  },
  {
    name: "orange",
    fills: { r: 1.0, g: 0.95, b: 0.87 },
    stroke: { r: 1.0, g: 0.65, b: 0.16 },
  },
  {
    name: "red",
    fills: { r: 0.99, g: 0.89, b: 0.87 },
    stroke: { r: 0.95, g: 0.28, b: 0.13 },
  },
  {
    name: "gray",
    fills: { r: 0.86, g: 0.86, b: 0.86 },
    stroke: { r: 0.17, g: 0.17, b: 0.17 },
  },
  {
    name: "light-violet",
    fills: { r: 0.98, g: 0.96, b: 1.0 },
    stroke: { r: 0.89, g: 0.8, b: 1.0 },
  },
  {
    name: "light-blue",
    fills: { r: 0.96, g: 0.98, b: 1.0 },
    stroke: { r: 0.74, g: 0.89, b: 1.0 },
  },
  {
    name: "light-green",
    fills: { r: 0.95, g: 0.99, b: 0.96 },
    stroke: { r: 0.68, g: 0.95, b: 0.77 },
  },
  {
    name: "light-yellow",
    fills: { r: 1.0, g: 0.98, b: 0.94 },
    stroke: { r: 1.0, g: 0.91, b: 0.64 },
  },
  {
    name: "light-orange",
    fills: { r: 1.0, g: 0.97, b: 0.94 },
    stroke: { r: 0.98, g: 0.82, b: 0.61 },
  },
  {
    name: "light-red",
    fills: { r: 1.0, g: 0.96, b: 0.96 },
    stroke: { r: 1.0, g: 0.78, b: 0.76 },
  },
  {
    name: "white",
    fills: { r: 1.0, g: 1.0, b: 1.0 },
    stroke: { r: 0.9, g: 0.9, b: 0.9 },
  },
]);

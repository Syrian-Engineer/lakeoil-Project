declare module "d3-interpolate";
declare module "d3-interpolate" {
  export function interpolateRgb(a: string, b: string): (t: number) => string;
  export function interpolateNumber(a: number, b: number): (t: number) => number;
  export function interpolateString(a: string, b: string): (t: number) => string;

  // Add other interpolators if needed
  export function interpolate(a: any, b: any): (t: number) => any;
}

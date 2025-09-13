declare module "react-liquid-gauge" {
  import * as React from "react";

  export interface LiquidFillGaugeProps {
    value: number;
    width?: number;
    height?: number;
    riseAnimation?: boolean;
    waveAnimation?: boolean;
    waveFrequency?: number;
    waveAmplitude?: number;
    textSize?: number;
    textOffsetX?: number;
    textOffsetY?: number;
    circleStyle?: React.CSSProperties;
    textStyle?: React.CSSProperties;
    waveStyle?: React.CSSProperties;
    waveTextStyle?: React.CSSProperties;
    gradient?: boolean;
    gradientStops?: {
      key: string;
      stopColor?: string;
      stopOpacity?: number;
      offset: string;
    }[];
    percent?: string;
    textRenderer?: (props: any) => React.ReactNode;
    style?: React.CSSProperties;
  }

  export default class LiquidFillGauge extends React.Component<LiquidFillGaugeProps> {}
}

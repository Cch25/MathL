export type Pos = {
  x: number;
  y: number;
};

export type Arc = {
  lastImpactTime: number;
  nextImpactTime: number;
  color: string;
  velocity: number;
};

export type Base = {
  length: number;
  minAngle: number;
  startAngle: number;
  maxAngle: number;
  initialRadius: number;
  circleRadius: number;
  clearance: number;
  spacing: number;
};

export type Settings = {
  startTime: number;
  duration: number;
  maxCycles: number;
  pulseEnabled: boolean;
  instrument: 'default' | 'wave' | 'vibraphone';
};

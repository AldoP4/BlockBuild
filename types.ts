export interface Position {
  x: number;
  y: number;
  z: number;
}

export interface BlockData {
  id: string;
  position: Position;
  color: string;
}

export enum ToolMode {
  BUILD = 'BUILD',
  DELETE = 'DELETE',
  PAINT = 'PAINT'
}

export interface GeneratedBlueprint {
  name: string;
  blocks: {
    x: number;
    y: number;
    z: number;
    color: string;
  }[];
}
import { SensorType } from "./sensor-type";
export interface SensorData {
  type: SensorType;
  value: number;
  unit: string;
}

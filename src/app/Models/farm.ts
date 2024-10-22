import { SensorData } from "./sensor-data";

export interface Farm {
  farmId: number;
  name: string;
  location: string;
  area: number;
  soilType: string;
  cropName: string;
  status: string;
  farmSize: string;
  sensorData: SensorData[];
}
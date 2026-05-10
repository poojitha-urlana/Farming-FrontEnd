export interface SensorData {
  id?: number;
  temperature: number;
  humidity: number;
  soilMoisture: number;
  relayState: boolean;
  timestamp?: string;
}
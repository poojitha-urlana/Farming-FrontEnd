export interface SensorData {
  // Define the structure of your SensorData here
  // For example:
  type: string; // The type of the sensor (e.g., temperature, humidity)
  value: number; // The value reported by the sensor
  timestamp: Date; // When the data was recorded
}

export interface Farm {
  id?: number; // Optional because it may not be set when creating a new farm
  name: string;
  location: string;
  area: number; // Farm area
  cropName?: string; // Crop name (optional)
  soilType?: string; // Soil type (optional)
  cropStatus?: string; // Crop status (optional)
  sensors?: SensorData[]; // List of sensor data
  createdAt?: Date; // Optional, as it is set by the server
  updatedAt?: Date; // Optional, as it is set by the server
}

export interface User {
  id: number;                // Unique identifier for the user
  username: string;         // Username of the user
  password: string;         // User's password (usually won't be sent in responses)
  email: string;            // Email address of the user
  fullName: string;         // Full name of the user
  confirmPassword?: string;  // For validation purposes, not persisted in backend
}

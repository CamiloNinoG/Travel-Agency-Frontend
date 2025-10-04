// src/models/User.ts
export interface User {
  _id: string;
  name: string;
  email: string;
  password?: string; // opcional, no mostramos la contraseña en la tabla
}

export enum AdminRole {
  Master = "master",
  Admin = "admin",
  Employee = "employee",
  Guest = "guest",
}

export interface AdminUser {
  id?: string;
  name: string;
  email: string;
  password: string;
  role: AdminRole;
  createdAt: string;
}

export interface ChagePasswordProps {
  email: string;
  password: string;
}

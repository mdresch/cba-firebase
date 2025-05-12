export interface User {
  uid: string;
  displayName: string | null;
  email: string;
  role?: string;
}
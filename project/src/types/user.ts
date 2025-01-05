export interface User {
  id: string;
  phone: string;
  username: string;
  name: string;
  type: "user" | "worker";
  avatar?: string;
}
export interface Worker extends User {
  type: "worker";
  services: string[];
  areas: string[];
  description: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  idCardVerified: boolean;
  experience: number;
}

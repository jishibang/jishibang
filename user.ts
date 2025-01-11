export interface User {
    id: string;
    phone: string;
    name: string;
    type: 'user' | 'worker';
    createdAt: string;
  }
  
  export interface Worker extends User {
    type: 'worker';
    skills: string[];
    areas: string[];
    description: string;
    experience: number;
    rating: number;
  }
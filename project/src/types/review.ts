export interface Review {
  id: string;
  workerId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  content: string;
  reply?: string;
  replyAt?: string;
  createdAt: string;
}

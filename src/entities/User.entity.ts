export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  role: 'ADMIN' | 'USER';
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
};

import { Exclude } from 'class-transformer';
import { User, Role, HostStatus, Provider } from '@prisma/client';

export class UserEntity implements User {
  id: string;
  email: string;
  fullName: string;

  @Exclude()
  password: string | null;

  avatar: string | null;
  bio: string | null;
  role: Role;
  provider: Provider;
  googleId: string | null;
  hostStatus: HostStatus;
  phoneNumber: string | null;
  identityCardUrl: string | null;
  identityCardCloudinaryId: string | null;
  rejectionReason: string | null;
  isActive: boolean;
  emailVerified: boolean;
  lastLoginAt: Date | null;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}

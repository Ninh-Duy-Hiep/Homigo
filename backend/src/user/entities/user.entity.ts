import { Exclude } from 'class-transformer';
import { User, Role, HostStatus, Provider } from '@prisma/client';

export class UserEntity implements User {
  id: string;
  email: string;
  fullName: string;

  @Exclude()
  password: string | null;
  @Exclude()
  role: Role;
  @Exclude()
  googleId: string | null;
  @Exclude()
  hostStatus: HostStatus;
  @Exclude()
  identityCardCloudinaryId: string | null;
  @Exclude()
  emailVerified: boolean;
  @Exclude()
  provider: Provider;

  avatar: string | null;
  bio: string | null;
  phoneNumber: string | null;
  identityCardUrl: string | null;
  rejectionReason: string | null;
  isActive: boolean;
  lastLoginAt: Date | null;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}

export interface UserFilter {
  search?: string;
  page?: number;
  limit?: number;
}

enum Provider {
  LOCAL = "LOCAL",
  GOOGLE = "GOOGLE"
}

enum HostStatus {
  NEW = "NEW",
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED"
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  avatar: string;
  bio: string;
  role: string;
  provider: Provider;
  googleId: string;
  hostStatus: HostStatus;
  phoneNumber: string;
  identityCardUrl: string;
  identityCardCloudinaryId: string;
  rejectionReason: string;
}
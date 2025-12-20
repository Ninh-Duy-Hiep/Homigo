export enum Role {
  USER = "USER",
  HOST = "HOST",
  ADMIN = "ADMIN",
}

export enum Provider {
  LOCAL = "LOCAL",
  GOOGLE = "GOOGLE",
}

export enum HostStatus {
  NEW = "NEW",
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export enum PropertyType {
  APARTMENT = "APARTMENT",
  HOUSE = "HOUSE",
  VILLA = "VILLA",
  HOTEL = "HOTEL",
  STUDIO = "STUDIO",
}

export enum AmenityCategory {
  BASIC = "BASIC",
  FACILITY = "FACILITY",
  SAFETY = "SAFETY",
}

export enum BookingStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
}

export enum PaymentStatus {
  UNPAID = "UNPAID",
  PAID = "PAID",
  REFUNDED = "REFUNDED",
}

export enum NotificationType {
  BOOKING = "BOOKING",
  REVIEW = "REVIEW",
  HOST_APPROVAL = "HOST_APPROVAL",
  PAYMENT = "PAYMENT",
  SYSTEM = "SYSTEM",
}

export enum TranslationEntityType {
  ROOM = "ROOM",
  USER_BIO = "USER_BIO",
}

export enum RequestStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

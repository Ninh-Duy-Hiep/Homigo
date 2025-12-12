// backend/src/users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role, HostStatus, RequestStatus, Prisma } from '@prisma/client';
import { FilterGuestDto } from './dto/filter-guest.dto';
import { FilterHostDto } from './dto/filter-host.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAllGuests(filter: FilterGuestDto) {
    const { page = 1, limit = 10, searchName, isActive } = filter;
    const skip = (page - 1) * limit;

    const where: Prisma.UserWhereInput = {
      role: Role.USER,
      ...(searchName
        ? {
            fullName: {
              contains: searchName,
            },
          }
        : {}),
      ...(isActive !== undefined ? { isActive: isActive } : {}),
    };

    const [guests, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          _count: {
            select: { bookings: true, reviews: true, wishlists: true }, // Count the number of bookings, reviews, and wishlists.
          },
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      data: guests,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getAllHosts(filter: FilterHostDto) {
    const { page = 1, limit = 10, searchName, hostStatus } = filter;
    const skip = (page - 1) * limit;

    const where: Prisma.UserWhereInput = {
      role: Role.HOST,
      ...(searchName
        ? {
            fullName: {
              contains: searchName,
            },
          }
        : {}),
      ...(hostStatus !== undefined ? { hostStatus: hostStatus } : {}),
    };

    const [hosts, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          _count: {
            select: { rooms: true }, // Count the number of rooms.
          },
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      data: hosts,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        updateRequests: {
          where: { status: RequestStatus.PENDING },
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });
    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async updateProfile(userId: string, dto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    if (user.role === Role.USER && user.hostStatus === HostStatus.NEW) {
      const updatedUser = await this.prisma.user.update({
        where: { id: userId },
        data: { ...dto },
      });
      return { message: 'Profile updated successfully', user: updatedUser };
    }

    if (Object.keys(dto).length > 0) {
      const existingRequest = await this.prisma.hostUpdateRequest.findFirst({
        where: { userId: user.id, status: RequestStatus.PENDING },
      });

      const changesData = JSON.parse(
        JSON.stringify(dto),
      ) as Prisma.InputJsonValue;

      if (existingRequest) {
        await this.prisma.hostUpdateRequest.update({
          where: { id: existingRequest.id },
          data: { changes: changesData },
        });
        return {
          message:
            'Your previous update request has been updated and is pending approval.',
        };
      } else {
        await this.prisma.hostUpdateRequest.create({
          data: {
            userId: user.id,
            changes: changesData,
            status: RequestStatus.PENDING,
          },
        });
        return {
          message:
            'Update request submitted. Admin will review your changes shortly.',
        };
      }
    }

    return { message: 'No changes detected' };
  }
}

// backend/src/users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role, HostStatus, RequestStatus, Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

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

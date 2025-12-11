import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Role, HostStatus, Provider } from '@prisma/client';

@Injectable()
export class UsersSeeder {
  constructor(private readonly prisma: PrismaService) {}

  async seed() {
    const salt = await bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash('@Admin123', salt);

    await this.prisma.user.upsert({
      where: { email: 'admin@homigo.com' },
      update: {},
      create: {
        email: 'admin@homigo.com',
        password: adminPassword,
        fullName: 'Super Admin',
        role: Role.ADMIN,
        provider: Provider.LOCAL,
        hostStatus: HostStatus.NEW,
        emailVerified: true,
        isActive: true,
      },
    });

    Logger.log('Users seeded.');
  }
}

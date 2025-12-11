import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/user.module';
import { PrismaService } from './prisma/prisma.service';
import { SeedService } from './database/seed.service';
import { UsersSeeder } from './database/seeds/users.seeder';

@Module({
  imports: [AuthModule, UsersModule],
  providers: [PrismaService, SeedService, UsersSeeder],
})
export class AppModule {}

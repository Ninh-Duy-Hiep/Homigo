import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { UsersSeeder } from './seeds/users.seeder';

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  constructor(private readonly usersSeeder: UsersSeeder) {}

  async onModuleInit() {
    this.logger.log('Starting seeding process...');

    await this.usersSeeder.seed();

    this.logger.log('Seeding process completed!');
  }
}

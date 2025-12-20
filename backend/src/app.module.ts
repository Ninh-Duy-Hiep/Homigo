import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { SeedService } from './database/seed.service';
import { UsersSeeder } from './database/seeds/users.seeder';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import { AuthModule } from './auth/auth.module';
import * as path from 'path';
import { UsersModule } from './user/user.module';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'vi',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),
    AuthModule,
    UsersModule,
  ],
  providers: [PrismaService, SeedService, UsersSeeder],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { SeedService } from './database/seed.service';
import { UsersSeeder } from './database/seeds/users.seeder';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import { AuthModule } from './auth/auth.module';
import * as path from 'path';
import { UsersModule } from './user/user.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

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
    MailerModule.forRoot({
      transport: {
        host: 'smtp.resend.com',
        port: 587,
        secure: false,
        auth: {
          user: 'resend',
          pass: process.env.RESEND_API_KEY,
        },
      },
      defaults: {
        from:
          process.env.NODE_ENV === 'production'
            ? 'Homigo <no-reply@homigo.dev>'
            : 'Homigo <onboarding@resend.dev>',
      },
      template: {
        dir: path.join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    AuthModule,
    UsersModule,
  ],
  providers: [PrismaService, SeedService, UsersSeeder],
})
export class AppModule {}

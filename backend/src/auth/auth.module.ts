import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthLocalService } from './services/auth-local.service';
import { AuthGoogleService } from './services/auth-google.service';
import { AuthVerificationService } from './services/auth-verification.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'super-secret',
      signOptions: { expiresIn: '1d' },
    }),
    MailerModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    GoogleStrategy,
    JwtStrategy,
    AuthLocalService,
    AuthGoogleService,
    AuthVerificationService,
  ],
})
export class AuthModule {}

import { RegisterGuestDto } from './dto/register-guest.dto';
import { RegisterHostDto } from './dto/register-host.dto';
import { LoginDto } from './dto/login.dto';
import { SendVerificationOtpDto } from './dto/send-verification-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

import { AuthLocalService } from './services/auth-local.service';
import { AuthGoogleService } from './services/auth-google.service';
import { AuthVerificationService } from './services/auth-verification.service';
import { Injectable } from '@nestjs/common';

export interface GoogleUser {
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
  accessToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private authLocalService: AuthLocalService,
    private authGoogleService: AuthGoogleService,
    private authVerificationService: AuthVerificationService,
  ) {}

  async registerGuest(dto: RegisterGuestDto) {
    return this.authLocalService.registerGuest(dto);
  }

  async registerHost(dto: RegisterHostDto, token?: string) {
    return this.authLocalService.registerHost(dto, token);
  }

  async login(dto: LoginDto) {
    return this.authLocalService.login(dto);
  }
  async googleLogin(googleUser: GoogleUser) {
    return this.authGoogleService.googleLogin(googleUser);
  }
  async requestEmailVerification(userId: string, dto: SendVerificationOtpDto) {
    return this.authVerificationService.requestEmailVerification(userId, dto);
  }

  async verifyOtp(userId: string, dto: VerifyOtpDto) {
    return this.authVerificationService.verifyOtp(userId, dto);
  }
}

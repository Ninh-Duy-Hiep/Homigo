import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RegisterGuestDto } from './dto/register-guest.dto';
import { RegisterHostDto } from './dto/register-host.dto';
import { LoginDto } from './dto/login.dto';
import { SendVerificationOtpDto } from './dto/send-verification-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/get-user.decorator';
import type { Request } from 'express';
import type { GoogleUser } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register/guest')
  @ApiOperation({ summary: 'Đăng kí tài khoản khách' })
  registerGuest(@Body() dto: RegisterGuestDto) {
    return this.authService.registerGuest(dto);
  }

  @Post('register/host')
  @ApiOperation({
    summary: 'Đăng kí tài khoản chủ nhà',
  })
  registerHost(@Body() dto: RegisterHostDto, @Req() req: Request) {
    const token = req.headers.authorization;
    return this.authService.registerHost(dto, token);
  }

  @Post('login')
  @ApiOperation({ summary: 'Đăng nhập' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Đăng nhập bằng Google (chỉ dành cho khách)' })
  googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Google Callback URL' })
  googleAuthRedirect(@GetUser() user: GoogleUser) {
    return this.authService.googleLogin(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('send-verification-otp')
  @ApiOperation({ summary: 'Gửi mã OTP xác thực email' })
  async sendOtp(
    @GetUser('userId') userId: string,
    @Body() dto: SendVerificationOtpDto,
  ) {
    return this.authService.requestEmailVerification(userId, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('verify-otp')
  @ApiOperation({ summary: 'Xác thực mã OTP' })
  async verifyOtp(
    @GetUser('userId') userId: string,
    @Body() dto: VerifyOtpDto,
  ) {
    return this.authService.verifyOtp(userId, dto);
  }
}

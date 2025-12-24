import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { MailerService } from '@nestjs-modules/mailer';
import { Prisma } from '@prisma/client';
import { SendVerificationOtpDto } from '../dto/send-verification-otp.dto';
import { VerifyOtpDto } from '../dto/verify-otp.dto';

@Injectable()
export class AuthVerificationService {
  constructor(
    private prisma: PrismaService,
    private readonly i18n: I18nService,
    private readonly mailerService: MailerService,
  ) {}

  async requestEmailVerification(userId: string, dto: SendVerificationOtpDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user)
      throw new BadRequestException(
        this.i18n.t('auth.USER_NOT_FOUND', {
          lang: I18nContext.current()?.lang,
        }),
      );

    const targetEmail = dto.newEmail ? dto.newEmail : user.email;

    if (dto.newEmail) {
      const emailExists = await this.prisma.user.findUnique({
        where: { email: dto.newEmail },
      });
      if (emailExists && emailExists.id !== userId) {
        throw new BadRequestException(
          this.i18n.t('auth.EMAIL_TAKEN', {
            lang: I18nContext.current()?.lang,
          }),
        );
      }
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await this.prisma.otp.upsert({
      where: { userId: userId },
      update: {
        code: otpCode,
        expiresAt: expiresAt,
        tempEmail: dto.newEmail || null,
      },
      create: {
        userId: userId,
        code: otpCode,
        expiresAt: expiresAt,
        tempEmail: dto.newEmail || null,
      },
    });

    await this.mailerService.sendMail({
      to: targetEmail,
      subject: this.i18n.t('auth.OTP_SUBJECT', {
        lang: I18nContext.current()?.lang,
      }),
      template: 'otp',
      context: {
        code: otpCode,
      },
    });

    return {
      message: this.i18n.t('auth.OTP_SENT', {
        lang: I18nContext.current()?.lang,
      }),
    };
  }

  async verifyOtp(userId: string, dto: VerifyOtpDto) {
    const otpRecord = await this.prisma.otp.findUnique({
      where: { userId: userId },
    });

    if (!otpRecord)
      throw new BadRequestException(
        this.i18n.t('auth.OTP_NOT_FOUND', {
          lang: I18nContext.current()?.lang,
        }),
      );
    if (otpRecord.code !== dto.code)
      throw new BadRequestException(
        this.i18n.t('auth.OTP_INVALID', { lang: I18nContext.current()?.lang }),
      );
    if (new Date() > otpRecord.expiresAt)
      throw new BadRequestException(
        this.i18n.t('auth.OTP_EXPIRED', { lang: I18nContext.current()?.lang }),
      );

    const updateData: Prisma.UserUpdateInput = { emailVerified: true };

    if (otpRecord.tempEmail) {
      updateData.email = otpRecord.tempEmail;
    }

    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: userId },
        data: updateData,
      }),
      this.prisma.otp.delete({
        where: { userId: userId },
      }),
    ]);

    return {
      message: this.i18n.t('auth.VERIFY_SUCCESS', {
        lang: I18nContext.current()?.lang,
      }),
    };
  }
}

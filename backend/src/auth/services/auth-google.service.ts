import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { Role, HostStatus, Provider } from '@prisma/client';
import { AuthLocalService } from './auth-local.service';
import { GoogleUser } from '../auth.service';

@Injectable()
export class AuthGoogleService {
  constructor(
    private prisma: PrismaService,
    private readonly i18n: I18nService,
    private authLocalService: AuthLocalService,
  ) {}

  async googleLogin(googleUser: GoogleUser) {
    if (!googleUser)
      throw new BadRequestException(
        this.i18n.t('auth.GOOGLE_NO_USER', {
          lang: I18nContext.current()?.lang,
        }),
      );

    const { email, firstName, lastName, picture } = googleUser;

    let user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email,
          fullName: `${firstName} ${lastName}`,
          avatar: picture,
          provider: Provider.GOOGLE,
          role: Role.USER,
          hostStatus: HostStatus.NEW,
          emailVerified: true,
        },
      });
    } else {
      if (user.role === Role.HOST || user.hostStatus === HostStatus.APPROVED) {
        throw new ForbiddenException(
          this.i18n.t('auth.HOST_GOOGLE_FORBIDDEN', {
            lang: I18nContext.current()?.lang,
          }),
        );
      }
    }

    const token = await this.authLocalService.signToken({
      userId: user.id,
      email: user.email,
      fullName: user.fullName,
      avatar: user.avatar,
      phoneNumber: user.phoneNumber,
      role: user.role,
    });
    return {
      message: this.i18n.t('auth.LOGIN_SUCCESS', {
        lang: I18nContext.current()?.lang,
      }),
      user,
      accessToken: token.accessToken,
    };
  }
}

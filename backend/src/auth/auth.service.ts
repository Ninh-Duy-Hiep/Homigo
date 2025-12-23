import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterGuestDto } from './dto/register-guest.dto';
import { RegisterHostDto } from './dto/register-host.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { Role, HostStatus, Provider } from '@prisma/client';
import { JwtPayload } from './strategies/jwt.strategy';
import { I18nContext, I18nService } from 'nestjs-i18n';

interface GoogleUser {
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
  accessToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private readonly i18n: I18nService,
  ) {}

  async registerGuest(dto: RegisterGuestDto) {
    const exists = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (exists)
      throw new BadRequestException(
        this.i18n.t('auth.USER_EXISTS', { lang: I18nContext.current()?.lang }),
      );

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        fullName: dto.fullName,
        phoneNumber: dto.phoneNumber,
        role: Role.USER,
        hostStatus: HostStatus.NEW,
        provider: Provider.LOCAL,
      },
    });

    const token = await this.signToken({
      userId: newUser.id,
      email: newUser.email,
      fullName: newUser.fullName,
      avatar: newUser.avatar,
      phoneNumber: newUser.phoneNumber,
      role: newUser.role,
    });

    return {
      message: this.i18n.t('auth.REGISTER_SUCCESS', {
        lang: I18nContext.current()?.lang,
      }),
      user: {
        id: newUser.id,
        email: newUser.email,
        fullName: newUser.fullName,
        role: newUser.role,
        avatar: newUser.avatar,
        hostStatus: newUser.hostStatus,
      },
      accessToken: token.accessToken,
    };
  }

  async registerHost(dto: RegisterHostDto, token?: string) {
    let currentUser: JwtPayload | null = null;

    if (token) {
      try {
        const extractedToken = token.replace('Bearer ', '').trim();
        currentUser = (await this.jwtService.verifyAsync(
          extractedToken,
        )) as unknown as JwtPayload;
      } catch {
        // Token invalid or expired
      }
    }

    if (currentUser) {
      if (currentUser.email !== dto.email) {
        throw new BadRequestException(
          this.i18n.t('auth.INVALID_CREDENTIALS', {
            lang: I18nContext.current()?.lang,
          }),
        );
      }

      const existingUser = await this.prisma.user.findUnique({
        where: { id: currentUser.userId },
      });

      if (!existingUser) {
        throw new BadRequestException(
          this.i18n.t('auth.USER_NOT_FOUND', {
            lang: I18nContext.current()?.lang,
          }),
        );
      }

      if (existingUser.role === Role.HOST) {
        throw new BadRequestException(
          this.i18n.t('auth.ALREADY_HOST', {
            lang: I18nContext.current()?.lang,
          }),
        );
      }

      if (existingUser.hostStatus === HostStatus.PENDING) {
        throw new BadRequestException(
          this.i18n.t('auth.REQUEST_PENDING', {
            lang: I18nContext.current()?.lang,
          }),
        );
      }

      if (
        existingUser.hostStatus === HostStatus.NEW ||
        existingUser.hostStatus === HostStatus.REJECTED ||
        existingUser.hostStatus === HostStatus.APPROVED
      ) {
        const updatedUser = await this.prisma.user.update({
          where: { id: existingUser.id },
          data: {
            fullName: dto.fullName,
            avatar: dto.avatar,
            bio: dto.bio,
            phoneNumber: dto.phoneNumber,
            identityCardUrl: dto.identityCardUrl,
            hostStatus: HostStatus.PENDING,
          },
        });

        return {
          message: this.i18n.t('auth.UPGRADE_HOST_SUCCESS', {
            lang: I18nContext.current()?.lang,
          }),
          user: {
            id: updatedUser.id,
            email: updatedUser.email,
            fullName: updatedUser.fullName,
            role: updatedUser.role,
            avatar: updatedUser.avatar,
          },
          accessToken: token,
        };
      }
    }

    const exists = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (exists) {
      throw new BadRequestException(
        this.i18n.t('auth.LOGIN_REQUIRED', {
          lang: I18nContext.current()?.lang,
        }),
      );
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        fullName: dto.fullName,
        avatar: dto.avatar,
        bio: dto.bio,
        phoneNumber: dto.phoneNumber,
        identityCardUrl: dto.identityCardUrl,
        role: Role.USER,
        hostStatus: HostStatus.PENDING,
        provider: Provider.LOCAL,
      },
    });

    const newToken = await this.signToken({
      userId: newUser.id,
      email: newUser.email,
      fullName: newUser.fullName,
      avatar: newUser.avatar,
      phoneNumber: newUser.phoneNumber,
      role: newUser.role,
    });

    return {
      message: this.i18n.t('auth.REGISTER_HOST_SUCCESS', {
        lang: I18nContext.current()?.lang,
      }),
      user: {
        id: newUser.id,
        email: newUser.email,
        fullName: newUser.fullName,
        role: newUser.role,
        avatar: newUser.avatar,
      },
      accessToken: newToken.accessToken,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user || !user.password)
      throw new UnauthorizedException(
        this.i18n.t('auth.INVALID_CREDENTIALS', {
          lang: I18nContext.current()?.lang,
        }),
      );

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch)
      throw new UnauthorizedException(
        this.i18n.t('auth.INVALID_CREDENTIALS', {
          lang: I18nContext.current()?.lang,
        }),
      );

    const token = await this.signToken({
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
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        avatar: user.avatar,
        hostStatus: user.hostStatus,
      },
      accessToken: token.accessToken,
    };
  }

  async googleLogin(req: { user: GoogleUser }) {
    if (!req.user)
      throw new BadRequestException(
        this.i18n.t('auth.GOOGLE_NO_USER', {
          lang: I18nContext.current()?.lang,
        }),
      );

    const { email, firstName, lastName, picture } = req.user;

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

    const token = await this.signToken({
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

  private async signToken(data: JwtPayload) {
    const payload = {
      userId: data.userId,
      email: data.email,
      fullName: data.fullName,
      avatar: data.avatar,
      phoneNumber: data.phoneNumber,
      role: data.role,
    };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}

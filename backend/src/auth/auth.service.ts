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
  ) {}

  async registerGuest(dto: RegisterGuestDto) {
    const exists = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (exists) throw new BadRequestException('Email đã tồn tại');

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    return this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        fullName: dto.fullName,
        role: Role.USER,
        hostStatus: HostStatus.NEW,
      },
    });
  }

  async registerHost(dto: RegisterHostDto) {
    const exists = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (exists) throw new BadRequestException('Email đã tồn tại');

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    return this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        fullName: dto.fullName,
        bio: dto.bio,
        phoneNumber: dto.phoneNumber,
        identityCardUrl: dto.identityCardUrl,
        role: Role.USER,
        hostStatus: HostStatus.PENDING,
      },
    });
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user || !user.password)
      throw new UnauthorizedException('Thông tin đăng nhập không hợp lệ');

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch)
      throw new UnauthorizedException('Thông tin đăng nhập không hợp lệ');

    return this.signToken({
      userId: user.id,
      email: user.email,
      fullName: user.fullName,
      avatar: user.avatar,
      phoneNumber: user.phoneNumber,
      role: user.role,
    });
  }

  async googleLogin(req: { user: GoogleUser }) {
    if (!req.user)
      throw new BadRequestException('Không có người dùng nào từ Google');

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
          'Chủ nhà không được phép đăng nhập bằng Google. Vui lòng sử dụng đăng nhập thông thường',
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
      message: 'Đăng nhập thành công',
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

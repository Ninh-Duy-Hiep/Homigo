// backend/src/users/users.controller.ts
import {
  Controller,
  Get,
  Body,
  Patch,
  UseGuards,
  Req,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

interface RequestWithUser {
  user: {
    userId: string;
    email: string;
    role: string;
  };
}

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @ApiOperation({ summary: 'Lấy thông tin cá nhân' })
  async getProfile(@Req() req: RequestWithUser) {
    const user = await this.usersService.getProfile(req.user.userId);
    return new UserEntity(user);
  }

  @Patch('profile')
  @ApiOperation({ summary: 'Cập nhật hồ sơ' })
  @ApiResponse({ status: 200, description: 'Success or Request Submitted' })
  async updateProfile(@Req() req: RequestWithUser, @Body() dto: UpdateUserDto) {
    const result = await this.usersService.updateProfile(req.user.userId, dto);

    if (result.user) {
      return { ...result, user: new UserEntity(result.user) };
    }
    return result;
  }
}

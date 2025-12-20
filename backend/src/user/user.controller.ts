import {
  Controller,
  Get,
  Body,
  Patch,
  UseGuards,
  Req,
  UseInterceptors,
  ClassSerializerInterceptor,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { JwtPayload } from 'src/auth/strategies/jwt.strategy';
import { FilterGuestDto } from './dto/filter-guest.dto';
import { FilterHostDto } from './dto/filter-host.dto';
import { UsersService } from './user.service';

interface RequestWithUser {
  user: JwtPayload;
}

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('guests')
  @ApiOperation({ summary: 'Lấy danh sách Guests' })
  async getAllGuests(@Query() filter: FilterGuestDto) {
    const result = await this.usersService.getAllGuests(filter);

    return {
      ...result,
      data: result.data.map((user) => new UserEntity(user)),
    };
  }

  @Get('hosts')
  @ApiOperation({ summary: 'Lấy danh sách Hosts' })
  async getAllHosts(@Query() filter: FilterHostDto) {
    const result = await this.usersService.getAllHosts(filter);

    return {
      ...result,
      data: result.data.map((user) => new UserEntity(user)),
    };
  }

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

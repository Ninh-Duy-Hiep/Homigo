import {
  Controller,
  Get,
  Body,
  Put,
  UseGuards,
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
import { FilterGuestDto } from './dto/filter-guest.dto';
import { FilterHostDto } from './dto/filter-host.dto';
import { UsersService } from './user.service';

import { GetUser } from 'src/auth/decorators/get-user.decorator';

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
  async getProfile(@GetUser('userId') userId: string) {
    const user = await this.usersService.getProfile(userId);
    return new UserEntity(user);
  }

  @Put('profile')
  @ApiOperation({ summary: 'Cập nhật hồ sơ' })
  @ApiResponse({ status: 200, description: 'Success or Request Submitted' })
  async updateProfile(
    @GetUser('userId') userId: string,
    @Body() dto: UpdateUserDto,
  ) {
    const result = await this.usersService.updateProfile(userId, dto);

    if (result.user) {
      return { ...result, user: new UserEntity(result.user) };
    }
    return result;
  }
}

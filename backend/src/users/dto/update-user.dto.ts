import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsPhoneNumber } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty({
    required: false,
    description: 'Changing this will trigger Admin Re-approval for Hosts',
  })
  @IsOptional()
  @IsString()
  identityCardUrl?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsPhoneNumber('VN')
  phoneNumber?: string;
}

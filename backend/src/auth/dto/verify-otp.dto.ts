import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyOtpDto {
  @ApiProperty({ example: '123456', description: 'Mã OTP 6 số' })
  @IsNotEmpty()
  @IsString()
  @Length(6, 6)
  code: string;
}

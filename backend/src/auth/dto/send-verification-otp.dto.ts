import { IsEmail, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SendVerificationOtpDto {
  @ApiPropertyOptional({ example: 'new_email@example.com' })
  @IsOptional()
  @IsEmail()
  newEmail?: string;
}

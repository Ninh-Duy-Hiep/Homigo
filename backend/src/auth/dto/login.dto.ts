import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail({}, { message: 'validation.EMAIL' })
  @IsNotEmpty({ message: 'validation.NOT_EMPTY' })
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString({ message: 'validation.STRING' })
  @IsNotEmpty({ message: 'validation.NOT_EMPTY' })
  password: string;

  @ApiProperty({
    example: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  rememberMe: boolean = false;
}

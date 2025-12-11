import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsPhoneNumber,
} from 'class-validator';

export class RegisterHostDto {
  @ApiProperty({ example: 'host@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'Chu Nha Uy Tin' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: '0987654321' })
  @IsPhoneNumber('VN')
  phoneNumber: string;

  @ApiProperty({ example: 'https://cloudinary.com/cccd-mat-truoc.jpg' })
  @IsString()
  @IsNotEmpty()
  identityCardUrl: string;

  @ApiProperty({
    example: 'Toi la host co 5 nam kinh nghiem...',
    required: false,
  })
  @IsString()
  bio?: string;
}

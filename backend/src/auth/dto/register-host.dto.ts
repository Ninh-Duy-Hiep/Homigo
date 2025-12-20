import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  // IsPhoneNumber,
  Matches,
  IsOptional,
} from 'class-validator';

export class RegisterHostDto {
  @ApiProperty({ example: 'host@example.com' })
  @IsNotEmpty({ message: 'validation.NOT_EMPTY' })
  @IsEmail({}, { message: 'validation.EMAIL' })
  email: string;

  @ApiProperty({ example: '@abc123' })
  @IsString({ message: 'validation.STRING' })
  @IsNotEmpty({ message: 'validation.NOT_EMPTY' })
  @MinLength(8, { message: 'validation.MIN' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).+$/, {
    message: 'validation.PASSWORD_REGEX',
  })
  password: string;

  @ApiProperty({ example: 'Nguyen Van A' })
  @IsString({ message: 'validation.STRING' })
  @IsNotEmpty({ message: 'validation.NOT_EMPTY' })
  fullName: string;

  @ApiProperty({
    example: 'Tôi là host có 5 năm kinh nghiệm...',
    required: false,
  })
  @IsString({ message: 'validation.STRING' })
  @IsOptional()
  bio?: string;

  @ApiProperty({ example: '0123456789' })
  @IsString({ message: 'validation.STRING' })
  @IsNotEmpty({ message: 'validation.NOT_EMPTY' })
  // @IsPhoneNumber('VN', { message: 'validation.PHONE_REGEX' })
  phoneNumber: string;

  @ApiProperty({ example: 'https://cloudinary.com/cccd-mat-truoc.jpg' })
  @IsString({ message: 'validation.STRING' })
  @IsNotEmpty({ message: 'validation.NOT_EMPTY' })
  identityCardUrl: string;
}

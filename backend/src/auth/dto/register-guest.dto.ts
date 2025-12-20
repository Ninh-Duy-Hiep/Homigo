import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  // IsPhoneNumber,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class RegisterGuestDto {
  @ApiProperty({ example: 'guest@example.com' })
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

  @ApiProperty({ example: '0123456789' })
  @IsString({ message: 'validation.STRING' })
  @IsNotEmpty({ message: 'validation.NOT_EMPTY' })
  // @IsPhoneNumber('VN', { message: 'validation.PHONE_REGEX' })
  phoneNumber: string;
}

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
  @IsNotEmpty({ message: 'Email không được để trống' })
  @IsEmail({}, { message: 'Email không hợp lệ, vui lòng nhập đúng định dạng' })
  email: string;

  @ApiProperty({ example: '@abc123' })
  @IsString()
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @MinLength(8, { message: 'Mật khẩu phải có ít nhất 8 kí tự' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).+$/, {
    message:
      'Mật khẩu phải chứa ít nhất 1 chữ thường, 1 chữ hoa và 1 ký tự đặc biệt',
  })
  password: string;

  @ApiProperty({ example: 'Nguyen Van A' })
  @IsString()
  @IsNotEmpty({ message: 'Họ và tên không được để trống' })
  fullName: string;

  @ApiProperty({
    example: 'Tôi là host có 5 năm kinh nghiệm...',
    required: false,
  })
  @IsString()
  @IsOptional()
  bio?: string;

  @ApiProperty({ example: '0123456789' })
  @IsString()
  @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
  // @IsPhoneNumber('VN', { message: 'Số điện thoại không hợp lệ' })
  phoneNumber: string;

  @ApiProperty({ example: 'https://cloudinary.com/cccd-mat-truoc.jpg' })
  @IsString()
  @IsNotEmpty({ message: 'CCCD không được để trống' })
  identityCardUrl: string;
}

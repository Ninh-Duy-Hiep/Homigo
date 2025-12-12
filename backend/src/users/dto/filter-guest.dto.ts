import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterGuestDto {
  @ApiPropertyOptional({ description: 'Số trang', default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({ description: 'Số mục trên mỗi trang', default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;

  @ApiPropertyOptional({ description: 'Tìm kiếm khách hàng theo tên' })
  @IsOptional()
  @IsString()
  searchName?: string;

  @ApiPropertyOptional({ description: 'Lọc theo trạng thái' })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

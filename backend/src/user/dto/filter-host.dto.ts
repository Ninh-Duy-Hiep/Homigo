import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { HostStatus } from '@prisma/client';

export class FilterHostDto {
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

  @ApiPropertyOptional({ description: 'Tìm kiếm chủ nhà theo tên' })
  @IsOptional()
  @IsString()
  searchName?: string;

  @ApiPropertyOptional({
    description: 'Lọc theo trạng thái hoạt động',
    enum: HostStatus,
  })
  @IsOptional()
  @IsEnum(HostStatus)
  hostStatus?: HostStatus;
}

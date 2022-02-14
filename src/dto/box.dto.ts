import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Min } from 'class-validator';
import { ItemDto } from './item.dto';
import { UserDto } from './userDto';

export class BoxDTO {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @Min(1)
  @ApiProperty()
  size: number;

  @ApiProperty({ type: [ItemDto] })
  items: ItemDto[];
}

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Unique } from 'modules/common';
import { SameAs } from 'modules/common/validator/same-as.validator';
import { User } from 'modules/user';

export class ProductPayload {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  price: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({
    required: false,
  })
  pictureURL: string;
}

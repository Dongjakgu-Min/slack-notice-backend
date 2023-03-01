import { ApiProperty } from '@nestjs/swagger';

class CreateBirthDto {
  @ApiProperty({
    nullable: false,
    example: 'Dongjakgu-Min',
    description: 'User Name',
    required: true,
  })
  name: string;
  @ApiProperty({
    nullable: false,
    example: '1998-12-04',
    description: 'birthdate date(ISO String)',
    required: true,
  })
  birthday: Date;
  @ApiProperty({
    nullable: true,
    default: false,
    example: true,
    description: 'is Birthday lunar-calendar?',
    required: false,
  })
  isLunar: boolean;
}

export default CreateBirthDto;

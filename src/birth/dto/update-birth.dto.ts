import { PartialType } from '@nestjs/mapped-types';
import { CreateBirthDto } from './create-birth.dto';

export class UpdateBirthDto extends PartialType(CreateBirthDto) {}

import { PartialType } from '@nestjs/swagger';
import { CreateCitaMedicaDto } from './create-cita-medica';
export class UpdateCitaMedicaDto extends PartialType(CreateCitaMedicaDto) {}

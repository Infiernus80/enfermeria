import { PartialType } from '@nestjs/swagger';
import { CreateTanqueOxigenoDto } from './create-tanques-oxigeno.dto';

export class UpdateTanquesOxigenoDto extends PartialType(
	CreateTanqueOxigenoDto,
) {}

import { PartialType } from '@nestjs/swagger';
import { CreateHorariosMedicamentoDto } from './create-horarios-medicamento.dto';

export class UpdateHorariosMedicamentoDto extends PartialType(
	CreateHorariosMedicamentoDto,
) {}

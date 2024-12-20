import { IsDateString, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { EstadoMedicamento } from 'src/common';

export class CreateHorariosMedicamentoDto {
	@IsNumber({}, { message: 'El ID del medicamento debe ser un número válido.' })
	@IsNotEmpty({ message: 'El ID del medicamento es obligatorio.' })
	id_medicamento: number;

	@IsDateString({}, { message: 'La hora de toma debe ser una fecha válida.' })
	@IsNotEmpty({ message: 'La hora de toma es obligatoria.' })
	hora_toma: Date;

	@IsNumber(
		{},
		{ message: 'El ID del administrador debe ser un número válido.' },
	)
	@IsNotEmpty({ message: 'El administrador del medicamento es obligatorio.' })
	administrado_por: number;

	@IsEnum(EstadoMedicamento, { message: 'El estado debe ser un valor válido.' })
	@IsNotEmpty({ message: 'El estado del medicamento es obligatorio.' })
	estado: EstadoMedicamento;
}

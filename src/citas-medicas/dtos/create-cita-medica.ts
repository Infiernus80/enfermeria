import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCitaMedicaDto {
	@IsNumber({}, { message: 'El ID del paciente debe ser un número válido' })
	@IsNotEmpty({ message: 'El paciente asociado es obligatorio' })
	id_paciente: number;

	@IsDateString({}, { message: 'La fecha debe ser una fecha válida' })
	@IsNotEmpty({ message: 'La fecha y hora de la cita son obligatorios' })
	fecha_hora: Date;

	@IsString({ message: 'Las notas deben ser texto válido' })
	notas: string;

	@IsNumber({}, { message: 'El ID del usuario debe ser un número válido' })
	@IsNotEmpty({ message: 'El usuario que acompaña es obligatorio' })
	acompanado_por: number;
}

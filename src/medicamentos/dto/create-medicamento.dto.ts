import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateMedicamentoDto {
	@IsString({ message: 'El nombre debe ser un texto válido' })
	@IsNotEmpty({ message: 'El nombre es obligatorio' })
	nombre: string;

	@IsString({ message: 'La dosis debe ser un texto válido' })
	@IsNotEmpty({ message: 'La dosis es obligatoria' })
	dosis: string;

	@IsNumber({}, { message: 'La frecuencia debe ser un número válido' })
	@Min(1, { message: 'La frecuencia debe ser mayor a 0' })
	@IsNotEmpty({ message: 'La frecuencia es obligatoria' })
	frecuencia_horas: number;

	@IsNumber({}, { message: 'El ID del paciente debe ser un número válido' })
	@IsNotEmpty({ message: 'El paciente asociado es obligatorio' })
	id_paciente: number;
}

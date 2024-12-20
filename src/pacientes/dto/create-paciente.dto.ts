import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePacienteDto {
	@IsString({ message: 'El nombre debe ser un texto válido' })
	@IsNotEmpty({ message: 'El nombre es obligatorio' })
	nombre: string;

	@IsString({ message: 'La edad debe ser un número válido' })
	@IsNotEmpty({ message: 'La edad es obligatoria' })
	edad: number;
}

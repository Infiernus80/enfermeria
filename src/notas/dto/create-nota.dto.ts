import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateNotaDto {
	@IsNumber({}, { message: 'El ID de la cita debe ser un número válido' })
	@IsNotEmpty({ message: 'El ID de la cita es obligatorio' })
	id_cita: number;

	@IsString({ message: 'El texto debe ser válido' })
	@IsNotEmpty({ message: 'El texto de la nota es obligatorio' })
	texto: string;
}

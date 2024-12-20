import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateGrupoFamiliarDto {
	@IsString({ message: 'El nombre del grupo debe de ser un texto valido' })
	@IsNotEmpty({ message: 'El nombre del grupo es obligatorio' })
	nombreGrupo: string;

	@IsNumber({}, { message: 'El ID del creador debe de ser un numero valido' })
	@IsNotEmpty({ message: 'El creador del grupo es obligatorio' })
	creado_por: number;
}

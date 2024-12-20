import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UsuarioRol } from 'src/common';

export class CreateUsuarioDto {
	@IsString({ message: 'El nombre debe ser un texto válido' })
	@IsNotEmpty({ message: 'El nombre es obligatorio' })
	nombre: string;

	@IsEmail({}, { message: 'El email debe de ser una dirección válida' })
	email: string;

	@IsString({ message: 'La contraseña debe ser un texto válido.' })
	@IsNotEmpty({ message: 'La contraseña es obligatoria' })
	password: string;

	@IsEnum(UsuarioRol, { message: 'El rol debe ser Admin o Familiar' })
	@IsNotEmpty({ message: 'El rol es obligatorio' })
	rol: UsuarioRol;
}

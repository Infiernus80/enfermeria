import { UsuarioRol } from 'src/common';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('usuarios')
export class Usuario {
	@PrimaryGeneratedColumn()
	id_usuario: number;

	@Column()
	nombre: string;

	@Column({ unique: true })
	email: string;

	@Column()
	password: string;

	@Column({ type: 'enum', enum: UsuarioRol, default: UsuarioRol.Familiar })
	rol: UsuarioRol;
}

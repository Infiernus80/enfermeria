import { Paciente } from 'src/pacientes/paciente.entity';
import { Usuario } from 'src/usuarios/usuarios.entity';
import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('grupos_familiares')
export class GruposFamiliares {
	@PrimaryGeneratedColumn({ name: 'id_grupo' })
	id: number;

	@Column({ name: 'nombre_grupo' })
	nombreGrupo: string;

	@ManyToOne(() => Usuario)
	@JoinColumn({ name: 'creado_por' })
	creadoPor: Usuario;

	@OneToMany(() => Paciente, paciente => paciente.grupoFamiliar)
	pacientes: Paciente[];
}

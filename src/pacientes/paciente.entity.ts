import { GruposFamiliares } from 'src/grupos-familiares/grupos-familiares.entity';
import { Medicamento } from 'src/medicamentos/medicamentos.entity';
import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('pacientes')
export class Paciente {
	@PrimaryGeneratedColumn()
	id_paciente: number;

	@Column()
	nombre: string;

	@Column()
	edad: number;

	@ManyToOne(() => GruposFamiliares, grupo => grupo.pacientes)
	@JoinColumn({ name: 'grupo_familiar_id' }) // FK a Grupos_Familiares
	grupoFamiliar: GruposFamiliares;

	@OneToMany(() => Medicamento, medicamento => medicamento.paciente)
	medicamentos: Medicamento[];
}

import { Paciente } from 'src/pacientes/paciente.entity';
import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('medicamentos')
export class Medicamento {
	@PrimaryGeneratedColumn({ name: 'id_medicamento' })
	id: number;

	@Column()
	nombre: string;

	@Column()
	dosis: string;

	@Column({ name: 'frecuencia_horas' })
	frecuenciaHoras: number;

	@ManyToOne(() => Paciente, paciente => paciente.medicamentos, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'id_paciente' })
	paciente: Paciente;
}

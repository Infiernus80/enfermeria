import { EstadoMedicamento } from 'src/common';
import { Medicamento } from 'src/medicamentos/medicamentos.entity';
import { Paciente } from 'src/pacientes/paciente.entity';
import { Usuario } from 'src/usuarios/usuarios.entity';
import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('horarios_medicamentos')
export class HorariosMedicamentos {
	@PrimaryGeneratedColumn({ name: 'id_horario' })
	id: number;

	@Column({ name: 'hora_toma', type: 'timestamp' })
	horaToma: Date;

	@Column({ type: 'enum', enum: EstadoMedicamento })
	estado: EstadoMedicamento;

	@ManyToOne(() => Medicamento, { eager: true })
	@JoinColumn({ name: 'id_medicamento' })
	medicamento: Medicamento;

	@ManyToOne(() => Paciente, { eager: true })
	@JoinColumn({ name: 'id_paciente' })
	paciente: Paciente;

	@ManyToOne(() => Usuario)
	@JoinColumn({ name: 'administrador_por' })
	administradoPor: Usuario;
}

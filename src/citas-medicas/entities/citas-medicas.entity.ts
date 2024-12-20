import { Paciente } from 'src/pacientes/paciente.entity';
import { Usuario } from 'src/usuarios/usuarios.entity';
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,
} from 'typeorm';

@Entity('citas_medicas')
export class CitasMedicas {
	@PrimaryGeneratedColumn({ name: 'id_cita' })
	id: number;

	@Column({ type: 'timestamp', nullable: false })
	fecha_hora: Date;

	@Column({ type: 'text', nullable: true })
	notas: string;

	@ManyToOne(() => Paciente, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'id_paciente' })
	paciente: Paciente;

	@ManyToOne(() => Usuario, { onDelete: 'SET NULL' })
	@JoinColumn({ name: 'acompanado_por' })
	acompanado_por: Usuario;
}

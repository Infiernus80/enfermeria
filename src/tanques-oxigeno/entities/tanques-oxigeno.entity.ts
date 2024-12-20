import { CTanques } from 'src/c_tanques/entities/c_tanques.entity';
import { Paciente } from 'src/pacientes/paciente.entity';
import { Usuario } from 'src/usuarios/usuarios.entity';
import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tanques_oxigeno')
export class TanquesOxigeno {
	@PrimaryGeneratedColumn({ name: 'id' })
	id: number;

	@Column({ name: 'flujo_litros_minuto', type: 'int' })
	flujoLitrosMinuto: number;

	@Column({ name: 'duracion_horas', type: 'float' })
	duracionHoras: number;

	@Column({ name: 'hora_inicio', type: 'timestamp' })
	horaInicio: Date;

	@Column({ name: 'hora_Fin', type: 'timestamp' })
	horaFin: Date;

	@Column({ name: 'precion_inicial', type: 'float' })
	precionInicial: number;

	@Column({
		name: 'estatus',
		type: 'enum',
		enum: ['TERMINADO', 'NUEVO'],
		default: 'NUEVO',
	})
	estatus: string;

	@OneToOne(() => CTanques, tanque => tanque.tanqueOxigeno)
	@JoinColumn({ name: 'id_tanque' })
	idTanque: CTanques;

	@ManyToOne(() => Paciente)
	@JoinColumn({ name: 'id_paciente' })
	paciente: Paciente;

	@ManyToOne(() => Usuario)
	@JoinColumn({ name: 'cambiado_por' })
	cambiadoPor: Usuario;
}

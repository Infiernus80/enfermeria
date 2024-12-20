import { CitasMedicas } from 'src/citas-medicas/entities/citas-medicas.entity';
import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('notas')
export class Notas {
	@PrimaryGeneratedColumn({ name: 'id_nota' })
	id: number;

	@Column({ type: 'text' })
	texto: string;

	@ManyToOne(() => CitasMedicas)
	@JoinColumn({ name: 'id_cita' })
	cita: CitasMedicas;
}

import { TanquesOxigeno } from 'src/tanques-oxigeno/entities/tanques-oxigeno.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

@Entity('c_tanques')
export class CTanques {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	cilindro: string;

	@Column('float')
	volumen_fisico: number;

	@OneToOne(() => TanquesOxigeno, tanque => tanque.idTanque)
	tanqueOxigeno: TanquesOxigeno;
}

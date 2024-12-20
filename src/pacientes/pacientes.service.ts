import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Paciente } from './paciente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PacienteService {
	constructor(
		@InjectRepository(Paciente)
		private pacienteRepository: Repository<Paciente>,
	) {}

	async findAll(): Promise<Paciente[]> {
		return this.pacienteRepository.find({ relations: ['grupoFamiliar'] });
	}

	async findOne(id: number): Promise<Paciente> {
		return this.pacienteRepository.findOne({
			where: { id_paciente: id },
			relations: ['grupoFamiliar'],
		});
	}

	async create(paciente: Partial<Paciente>): Promise<Paciente> {
		return this.pacienteRepository.save(paciente);
	}

	async delete(id: number): Promise<void> {
		return this.pacienteRepository.delete(id).then(() => undefined);
	}
}

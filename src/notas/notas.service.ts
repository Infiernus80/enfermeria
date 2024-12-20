import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notas } from './entities/notas.entity';
import { Repository } from 'typeorm';
import { CitasMedicas } from 'src/citas-medicas/entities/citas-medicas.entity';
import { BadRequest, NotFound } from 'src/common';
import { CreateNotaDto } from './dto/create-nota.dto';

@Injectable()
export class NotasService {
	constructor(
		@InjectRepository(Notas)
		private readonly notasRepository: Repository<Notas>,
		@InjectRepository(CitasMedicas)
		private readonly citasMedicasRepository: Repository<CitasMedicas>,
	) {}

	async create(nota: CreateNotaDto): Promise<Notas> {
		try {
			const cita = await this.citasMedicasRepository.findOne({
				where: { id: nota.id_cita },
			});

			if (!cita) {
				throw new NotFound(`La cita médica con ID ${nota.id_cita} no existe.`);
			}

			const nuevaNota = this.notasRepository.create({
				cita,
				texto: nota.texto,
			});

			return await this.notasRepository.save(nuevaNota);
		} catch (error) {
			console.error(error);
			throw new BadRequest('Error al crear la nota.');
		}
	}
	async findById(id: number): Promise<Notas> {
		const nota = await this.notasRepository.findOne({
			where: { id },
			relations: ['cita'],
		});

		if (!nota) {
			throw new NotFound(`Nota con ID ${id} no encontrada.`);
		}

		return nota;
	}

	async delete(id: number): Promise<void> {
		const result = await this.notasRepository.delete(id);
		if (result.affected === 0) {
			throw new NotFound(`Nota con ID ${id} no encontrada.`);
		}
	}
}

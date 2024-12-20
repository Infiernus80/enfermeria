// Servicio de Citas Médicas
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NotFound, BadRequest } from 'src/common';

import { CreateCitaMedicaDto } from './dtos/create-cita-medica';
import { CitasMedicas } from './entities/citas-medicas.entity';
import { Paciente } from 'src/pacientes/paciente.entity';
import { Usuario } from 'src/usuarios/usuarios.entity';

// Interfaz para el resultado de una cita médica
export interface CitaMedicaResponse {
	acompanante: string;
	paciente: string;
	fechaHora: Date;
	nota: string;
}

@Injectable()
export class CitasMedicasService {
	constructor(
		@InjectRepository(CitasMedicas)
		private readonly citasMedicasRepository: Repository<CitasMedicas>,
	) {}

	async create(cita: CreateCitaMedicaDto): Promise<CitasMedicas> {
		try {
			// Verificar que el paciente exista
			const paciente = await this.citasMedicasRepository.manager.findOne(
				Paciente,
				{
					where: { id_paciente: cita.id_paciente },
				},
			);
			if (!paciente) {
				throw new BadRequest(
					`El paciente con ID ${cita.id_paciente} no existe.`,
				);
			}

			// Verificar que el usuario que acompaña exista
			const usuario = await this.citasMedicasRepository.manager.findOne(
				Usuario,
				{
					where: { id_usuario: cita.acompanado_por },
				},
			);
			if (!usuario) {
				throw new BadRequest(
					`El usuario con ID ${cita.acompanado_por} no existe.`,
				);
			}

			// Crear la entidad
			const nuevaCita = this.citasMedicasRepository.create({
				fecha_hora: cita.fecha_hora,
				notas: cita.notas,
				paciente, // Relación con el paciente
				acompanado_por: usuario, // Relación con el usuario
			});

			// Guardar la entidad
			return await this.citasMedicasRepository.save(nuevaCita);
		} catch (error) {
			console.error(error);
			throw new BadRequest('Error al crear la cita médica.');
		}
	}

	async findById(id: number): Promise<CitaMedicaResponse> {
		const cita = await this.citasMedicasRepository.findOne({
			where: { id },
			relations: ['paciente', 'acompanado_por'],
		});
		if (!cita) throw new NotFound(`Cita médica con ID ${id} no encontrada.`);
		return {
			acompanante: cita.acompanado_por.nombre,
			paciente: cita.paciente.nombre,
			fechaHora: cita.fecha_hora,
			nota: cita.notas,
		};
	}

	async delete(id: number): Promise<void> {
		const result = await this.citasMedicasRepository.delete(id);
		if (result.affected === 0) {
			throw new NotFound(`Cita médica con ID ${id} no encontrada.`);
		}
	}
}

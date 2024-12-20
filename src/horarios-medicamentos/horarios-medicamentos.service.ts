import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HorariosMedicamentos } from './horarios-medicamentos.entity';

import { NotFound, BadRequest } from 'src/common';
import { Medicamento } from 'src/medicamentos/medicamentos.entity';
import { Usuario } from 'src/usuarios/usuarios.entity';
import { CreateHorariosMedicamentoDto } from './dto/create-horarios-medicamento.dto';

@Injectable()
export class HorariosMedicamentosService {
	constructor(
		@InjectRepository(HorariosMedicamentos)
		private readonly horariosMedicamentosRepository: Repository<HorariosMedicamentos>,
		@InjectRepository(Medicamento)
		private readonly medicamentosRepository: Repository<Medicamento>,
		@InjectRepository(Usuario)
		private readonly usuariosRepository: Repository<Usuario>,
	) {}

	async create(horario: CreateHorariosMedicamentoDto): Promise<any> {
		try {
			// Buscar el medicamento y obtener su paciente asociado
			const medicamento = await this.medicamentosRepository.findOne({
				where: { id: horario.id_medicamento },
				relations: ['paciente'], // Asegúrate de incluir la relación con el paciente
			});

			if (!medicamento) {
				throw new NotFound(
					`El medicamento con ID ${horario.id_medicamento} no existe.`,
				);
			}

			// Validar si el medicamento tiene un paciente asociado
			if (!medicamento.paciente) {
				throw new BadRequest(
					`El medicamento con ID ${horario.id_medicamento} no está asignado a ningún paciente.`,
				);
			}

			// Buscar al usuario que administra el medicamento
			const usuario = await this.usuariosRepository.findOne({
				where: { id_usuario: horario.administrado_por },
			});

			if (!usuario) {
				throw new NotFound(
					`El usuario con ID ${horario.administrado_por} no existe.`,
				);
			}

			// Crear el nuevo horario incluyendo el paciente
			const nuevoHorario = this.horariosMedicamentosRepository.create({
				medicamento,
				paciente: medicamento.paciente, // Asignar automáticamente el paciente
				horaToma: horario.hora_toma,
				administradoPor: usuario,
				estado: horario.estado,
			});

			// Guardar el horario en la base de datos
			const result =
				await this.horariosMedicamentosRepository.save(nuevoHorario);

			// Retornar el resultado con la estructura esperada
			return {
				horaToma: result.horaToma,
				estado: result.estado,
				medicamento: {
					nombre: result.medicamento.nombre,
					dosis: result.medicamento.dosis,
					frecuencia: result.medicamento.frecuenciaHoras,
				},
				administradoPor: result.administradoPor.nombre,
				paciente: result.paciente.nombre, // Incluir información del paciente
			};
		} catch (error) {
			console.error(error);
			throw new BadRequest('Error al crear el horario de medicamento.');
		}
	}

	async findByPaciente(id: number): Promise<any> {
		const horarios = await this.horariosMedicamentosRepository.find({
			where: { paciente: { id_paciente: id } },
			relations: ['administradoPor'], // Ya no necesitas 'medicamento.paciente'
		});

		if (!horarios || horarios.length === 0) {
			throw new NotFound(
				'El paciente no tiene horarios de medicamentos asignados.',
			);
		}

		const paciente = horarios[0].paciente.nombre; // Relación directa con el paciente
		const administradoPor = horarios[0].administradoPor.nombre;

		return {
			paciente,
			administradoPor,
			medicamentos: horarios.map(horario => ({
				nombre: horario.medicamento.nombre,
				dosis: horario.medicamento.dosis,
				frecuenciaHoras: horario.medicamento.frecuenciaHoras,
			})),
		};
	}

	async delete(id: number): Promise<void> {
		const result = await this.horariosMedicamentosRepository.delete(id);
		if (result.affected === 0) {
			throw new NotFound(`Horario de medicamento con ID ${id} no encontrado.`);
		}
	}
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTanqueOxigenoDto } from './dto/create-tanques-oxigeno.dto';
import { TanquesOxigeno } from './entities/tanques-oxigeno.entity';
import { NotFound, BadRequest } from 'src/common';
import { Paciente } from 'src/pacientes/paciente.entity';
import { Usuario } from 'src/usuarios/usuarios.entity';
import { Repository } from 'typeorm';
import { CTanques } from 'src/c_tanques/entities/c_tanques.entity';

enum Estatus {
	TERMINADO = 'TERMINADO',
	NUEVO = 'NUEVO',
}

@Injectable()
export class TanquesOxigenoService {
	constructor(
		@InjectRepository(TanquesOxigeno)
		private readonly tanquesOxigenoRepository: Repository<TanquesOxigeno>,
		@InjectRepository(Paciente)
		private readonly pacientesRepository: Repository<Paciente>,
		@InjectRepository(Usuario)
		private readonly usuariosRepository: Repository<Usuario>,
		@InjectRepository(CTanques)
		private readonly tanquesRepository: Repository<CTanques>,
	) {}

	async create(tanque: CreateTanqueOxigenoDto): Promise<any> {
		try {
			const existTanquePaciente = await this.tanquesOxigenoRepository.findOne({
				where: { paciente: { id_paciente: tanque.idPaciente } },
			});

			if (existTanquePaciente) {
				throw new BadRequest(
					'El paciente ya tiene un tanque de oxígeno asignado.',
				);
			}

			const { volumen_fisico } = await this.tanquesRepository.findOne({
				where: { id: tanque.idTanque },
			});

			const volumenTotal = volumen_fisico * tanque.precionInicial; // Volumen total en litros
			const duracion = volumenTotal / tanque.flujoLitrosMinuto; // Duración total en minutos

			const duracionHoras = Math.floor(duracion / 60); // Horas completas
			const duracionMinutos = duracion % 60; // Minutos restantes

			// Crear la fecha de término
			const fechaTermino = new Date(tanque.horaInicio); // Copia de la fecha de inicio
			fechaTermino.setHours(fechaTermino.getHours() + duracionHoras); // Suma horas
			fechaTermino.setMinutes(fechaTermino.getMinutes() + duracionMinutos); // Suma minutos

			// Convertir la fecha de término al formato YYYY-MM-DD HH:mm:ss
			const formatoFecha = (fecha: Date): string => {
				const year = fecha.getFullYear();
				const month = String(fecha.getMonth() + 1).padStart(2, '0'); // Mes (0-11, se suma 1)
				const day = String(fecha.getDate()).padStart(2, '0');
				const hours = String(fecha.getHours()).padStart(2, '0');
				const minutes = String(fecha.getMinutes()).padStart(2, '0');
				const seconds = String(fecha.getSeconds()).padStart(2, '0');

				return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
			};

			const result = this.tanquesOxigenoRepository.create({
				flujoLitrosMinuto: tanque.flujoLitrosMinuto,
				duracionHoras: duracionHoras + duracionMinutos / 60,
				horaInicio: tanque.horaInicio,
				horaFin: formatoFecha(fechaTermino),
				precionInicial: tanque.precionInicial,
				estatus: tanque.estatus || Estatus.NUEVO,
				idTanque: { id: tanque.idTanque },
				paciente: { id_paciente: tanque.idPaciente },
				cambiadoPor: { id_usuario: tanque.cambiadoPor },
			});

			await this.tanquesOxigenoRepository.save(result);
		} catch (error) {
			console.error(error);
			throw new BadRequest('Error al crear el tanque de oxígeno.');
		}
	}

	async findById(id: number): Promise<any> {}

	async delete(id: number): Promise<void> {
		const result = await this.tanquesOxigenoRepository.delete(id);
		if (result.affected === 0) {
			throw new NotFound(`Tanque de oxígeno con ID ${id} no encontrado.`);
		}
	}
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Medicamento } from './medicamentos.entity';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { CreateMedicamentoDto } from './dto/create-medicamento.dto';
import { BadRequest, NotFound } from 'src/common';
import { Paciente } from 'src/pacientes/paciente.entity';

interface Medicamentos {
	nombre: string;
	dosis: string;
	frecuenciaHoras: number;
}

interface ResponseMedicamentosPersona {
	nombre: string;
	medicamentos: Medicamentos[];
}

@Injectable()
export class MedicamentosService {
	constructor(
		@InjectRepository(Medicamento)
		private medicamentoRepository: Repository<Medicamento>,
		@InjectRepository(Paciente)
		private pacienteRepository: Repository<Paciente>,
		private dataSource: DataSource,
	) {}

	async create(medicamento: CreateMedicamentoDto): Promise<Medicamento> {
		const queryRunner: QueryRunner = this.dataSource.createQueryRunner();

		await queryRunner.connect();
		await queryRunner.startTransaction();

		try {
			// Validamos si el paciente existe
			const paciente = await this.pacienteRepository.findOne({
				where: { id_paciente: medicamento.id_paciente },
			});

			if (!paciente) {
				throw new NotFound(
					`Paciente con ID ${medicamento.id_paciente} no encontrado.`,
				);
			}

			// Verificar si el paciente ya tiene este medicamento
			const medicamentoExiste = await queryRunner.manager.findOne(Medicamento, {
				where: {
					nombre: medicamento.nombre,
					paciente: { id_paciente: medicamento.id_paciente },
				},
			});

			if (medicamentoExiste) {
				throw new BadRequest(
					`El paciente ya tiene registrado el medicamento "${medicamento.nombre}".`,
				);
			}

			// Crear y guardar el nuevo medicamento
			const nuevoMedicamento = await this.medicamentoRepository.create({
				nombre: medicamento.nombre,
				dosis: medicamento.dosis,
				frecuenciaHoras: medicamento.frecuencia_horas,
				paciente,
			});

			const saveMedicamento =
				await this.medicamentoRepository.save(nuevoMedicamento);

			// Confirmar la transacción
			await queryRunner.commitTransaction();
			return saveMedicamento;
		} catch (error) {
			await queryRunner.rollbackTransaction();
			throw new BadRequest(
				`Ocurrió un error al agregar el medicamento ${error.message}`,
			);
		} finally {
			await queryRunner.release();
		}
	}

	async findByPaciente(id: number): Promise<ResponseMedicamentosPersona> {
		//Verificar si el paciente existe
		const paciente = await this.pacienteRepository.findOne({
			where: { id_paciente: id },
		});

		if (!paciente) {
			throw new NotFound('Este paciente no existe');
		}

		//Buscar los medicamentos asociados a este paciente
		const medicamento = await this.medicamentoRepository.find({
			where: { paciente: { id_paciente: id } },
		});

		return {
			nombre: paciente.nombre,
			medicamentos: medicamento.map(medicamento => ({
				id: medicamento.id,
				nombre: medicamento.nombre,
				dosis: medicamento.dosis,
				frecuenciaHoras: medicamento.frecuenciaHoras,
			})),
		};
	}
}

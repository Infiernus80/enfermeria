import { Body, Controller, Get, Param, Post, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { HorariosMedicamentosService } from './horarios-medicamentos.service';

import { CustomRes } from 'src/common';
import { CreateHorariosMedicamentoDto } from './dto/create-horarios-medicamento.dto';

@ApiTags('Horarios Medicamentos')
@Controller('horarios-medicamentos')
export class HorariosMedicamentosController {
	constructor(
		private readonly horariosMedicamentosService: HorariosMedicamentosService,
	) {}

	@Post()
	@ApiOperation({ summary: 'Crear un nuevo horario de medicamento' })
	@ApiBody({
		description: 'Datos para crear un horario de medicamento',
		schema: {
			type: 'object',
			properties: {
				id_medicamento: {
					type: 'number',
					example: 1,
					description: 'ID del medicamento',
				},
				hora_toma: {
					type: 'string',
					format: 'date-time',
					example: '2024-12-18T08:00:00Z',
					description: 'Hora de la toma del medicamento',
				},
				administrado_por: {
					type: 'number',
					example: 2,
					description: 'ID del usuario que administra el medicamento',
				},
				estado: {
					type: 'string',
					enum: ['Pendiente', 'Tomado', 'Omitido'],
					example: 'Pendiente',
					description: 'Estado del medicamento',
				},
			},
			required: ['id_medicamento', 'hora_toma', 'administrado_por', 'estado'],
		},
	})
	@ApiResponse({
		status: 201,
		description: 'Horario de medicamento creado correctamente.',
	})
	@ApiResponse({
		status: 400,
		description: 'Error al crear el horario de medicamento.',
	})
	async create(@Body() horario: CreateHorariosMedicamentoDto) {
		try {
			const result = await this.horariosMedicamentosService.create(horario);
			return CustomRes.json({
				success: true,
				msg: 'Horario de medicamento creado correctamente.',
				result,
			});
		} catch (error) {
			return CustomRes.json({
				success: false,
				msg: error.message || 'Hubo un error.',
			});
		}
	}

	@Get(':id')
	@ApiOperation({ summary: 'Obtener un horario de medicamento por ID' })
	@ApiResponse({
		status: 200,
		description: 'Horario de medicamento obtenido correctamente.',
	})
	@ApiResponse({
		status: 404,
		description: 'Horario de medicamento no encontrado.',
	})
	async findById(@Param('id') id: number) {
		try {
			const result = await this.horariosMedicamentosService.findByPaciente(id);
			return CustomRes.json({
				success: true,
				msg: 'Horario de medicamento obtenido correctamente.',
				result,
			});
		} catch (error) {
			return CustomRes.json({
				success: false,
				msg: error.message || 'Hubo un error.',
			});
		}
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Eliminar un horario de medicamento por ID' })
	@ApiResponse({
		status: 200,
		description: 'Horario de medicamento eliminado correctamente.',
	})
	@ApiResponse({
		status: 404,
		description: 'Horario de medicamento no encontrado.',
	})
	async delete(@Param('id') id: number) {
		try {
			await this.horariosMedicamentosService.delete(id);
			return CustomRes.json({
				success: true,
				msg: 'Horario de medicamento eliminado correctamente.',
			});
		} catch (error) {
			return CustomRes.json({
				success: false,
				msg: error.message || 'Hubo un error.',
			});
		}
	}
}

import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TanquesOxigenoService } from './tanques-oxigeno.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomRes } from 'src/common';
import { CreateTanqueOxigenoDto } from './dto/create-tanques-oxigeno.dto';

@ApiTags('Tanques Oxígeno')
@Controller('tanques-oxigeno')
export class TanquesOxigenoController {
	constructor(private readonly tanquesOxigenoService: TanquesOxigenoService) {}

	@Post()
	@ApiOperation({ summary: 'Crear un nuevo tanque de oxígeno' })
	@ApiBody({
		description: 'Datos para crear un tanque de oxígeno',
		schema: {
			type: 'object',
			properties: {
				flujoLitrosMinuto: {
					type: 'number',
					example: 3,
					description: 'Flujo de oxígeno en litros por minuto (1 a 15)',
				},
				horaInicio: {
					type: 'string',
					format: 'date-time',
					example: '2024-12-20T14:00:00Z',
					description: 'Fecha y hora de inicio del uso del tanque',
				},
				precionInicial: {
					type: 'number',
					example: 200,
					description: 'Presión inicial del tanque en BAR',
				},
				idTanque: {
					type: 'number',
					example: 1,
					description: 'ID del tanque físico',
				},
				idPaciente: {
					type: 'number',
					example: 2,
					description: 'ID del paciente asociado al tanque',
				},
				cambiadoPor: {
					type: 'number',
					example: 4,
					description: 'ID del usuario que cambió el tanque',
				},
			},
			required: [
				'flujoLitrosMinuto',
				'duracionHoras',
				'horaInicio',
				'horaFin',
				'precionInicial',
				'estatus',
				'idTanque',
				'idPaciente',
				'cambiadoPor',
			],
		},
	})
	@ApiResponse({
		status: 201,
		description: 'Tanque de oxígeno creado correctamente.',
	})
	@ApiResponse({
		status: 400,
		description: 'Error al crear el tanque de oxígeno.',
	})
	async create(@Body() tanque: CreateTanqueOxigenoDto) {
		try {
			const result = await this.tanquesOxigenoService.create(tanque);
			return CustomRes.json({
				success: true,
				msg: 'Tanque de oxígeno creado correctamente.',
				result,
			});
		} catch (error) {
			return CustomRes.json({
				success: true,
				msg: error.message,
			});
		}
	}

	@Get(':id')
	@ApiOperation({ summary: 'Obtener un tanque de oxígeno por ID' })
	@ApiResponse({
		status: 200,
		description: 'Tanque de oxígeno obtenido correctamente.',
	})
	@ApiResponse({ status: 404, description: 'Tanque de oxígeno no encontrado.' })
	async findById(@Param('id') id: number) {
		const result = await this.tanquesOxigenoService.findById(id);
		return CustomRes.json({
			success: false,
			msg: 'Tanque de oxígeno obtenido correctamente.',
			result,
		});
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Eliminar un tanque de oxígeno por ID' })
	@ApiResponse({
		status: 200,
		description: 'Tanque de oxígeno eliminado correctamente.',
	})
	@ApiResponse({ status: 404, description: 'Tanque de oxígeno no encontrado.' })
	async delete(@Param('id') id: number) {
		await this.tanquesOxigenoService.delete(id);
		return CustomRes.json({
			success: true,
			msg: 'Tanque de oxígeno eliminado correctamente.',
		});
	}
}

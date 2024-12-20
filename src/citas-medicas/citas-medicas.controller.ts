// Controlador de Citas Médicas
import { Body, Controller, Get, Param, Post, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CitasMedicasService } from './citas-medicas.service';
import { CustomRes } from 'src/common';
import { CreateCitaMedicaDto } from './dtos/create-cita-medica';

@ApiTags('Citas Médicas')
@Controller('citas-medicas')
export class CitasMedicasController {
	constructor(private readonly citasMedicasService: CitasMedicasService) {}

	@Post()
	@ApiOperation({ summary: 'Crear una nueva cita médica' })
	@ApiBody({
		description: 'Datos para crear una nueva cita médica',
		schema: {
			type: 'object',
			properties: {
				id_paciente: {
					type: 'number',
					example: 1,
					description: 'ID del paciente asociado',
				},
				fecha_hora: {
					type: 'string',
					format: 'date-time',
					example: '2024-12-18T10:00:00Z',
					description: 'Fecha y hora de la cita',
				},
				notas: {
					type: 'string',
					example: 'Consulta general',
					description: 'Notas adicionales sobre la cita',
				},
				acompanado_por: {
					type: 'number',
					example: 2,
					description: 'ID del usuario que acompaña al paciente',
				},
			},
			required: ['id_paciente', 'fecha_hora', 'acompanado_por'],
		},
	})
	@ApiResponse({
		status: 201,
		description: 'Cita médica creada correctamente.',
	})
	@ApiResponse({ status: 400, description: 'Error al crear la cita médica.' })
	async create(@Body() cita: CreateCitaMedicaDto) {
		const result = await this.citasMedicasService.create(cita);
		return CustomRes.json({
			success: true,
			msg: 'Cita médica creada correctamente.',
			result,
		});
	}

	@Get(':id')
	@ApiOperation({ summary: 'Obtener una cita médica por ID' })
	@ApiResponse({
		status: 200,
		description: 'Cita médica obtenida correctamente.',
	})
	@ApiResponse({ status: 404, description: 'Cita médica no encontrada.' })
	async findById(@Param('id') id: number) {
		try {
			const result = await this.citasMedicasService.findById(id);
			return CustomRes.json({
				success: true,
				msg: 'Cita médica obtenida correctamente.',
				result,
			});
		} catch (error) {
			return CustomRes.json({
				success: true,
				msg: error.message || 'Error al obtener la cita medica',
			});
		}
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Eliminar una cita médica por ID' })
	@ApiResponse({
		status: 200,
		description: 'Cita médica eliminada correctamente.',
	})
	@ApiResponse({ status: 404, description: 'Cita médica no encontrada.' })
	async delete(@Param('id') id: number) {
		await this.citasMedicasService.delete(id);
		return CustomRes.json({
			success: true,
			msg: 'Cita médica eliminada correctamente.',
		});
	}
}

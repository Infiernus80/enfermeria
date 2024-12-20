import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { NotasService } from './notas.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomRes } from 'src/common';
import { CreateNotaDto } from './dto/create-nota.dto';
@ApiTags('Notas')
@Controller('notas')
export class NotasController {
	constructor(private readonly notasService: NotasService) {}

	@Post()
	@ApiOperation({ summary: 'Crear una nueva nota para una cita médica' })
	@ApiBody({
		description: 'Datos para crear una nota',
		schema: {
			type: 'object',
			properties: {
				id_cita: {
					type: 'number',
					example: 1,
					description: 'ID de la cita médica asociada',
				},
				texto: {
					type: 'string',
					example: 'Nota sobre la cita médica',
					description: 'Texto de la nota',
				},
			},
			required: ['id_cita', 'texto'],
		},
	})
	@ApiResponse({ status: 201, description: 'Nota creada correctamente.' })
	@ApiResponse({ status: 400, description: 'Error al crear la nota.' })
	async create(@Body() nota: CreateNotaDto) {
		const result = await this.notasService.create(nota);
		return CustomRes.json({
			success: true,
			msg: 'Nota creada correctamente.',
			result,
		});
	}

	@Get(':id')
	@ApiOperation({ summary: 'Obtener una nota por ID' })
	@ApiResponse({ status: 200, description: 'Nota obtenida correctamente.' })
	@ApiResponse({ status: 404, description: 'Nota no encontrada.' })
	async findById(@Param('id') id: number) {
		const result = await this.notasService.findById(id);
		return CustomRes.json({
			success: true,
			msg: 'Nota obtenida correctamente.',
			result,
		});
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Eliminar una nota por ID' })
	@ApiResponse({ status: 200, description: 'Nota eliminada correctamente.' })
	@ApiResponse({ status: 404, description: 'Nota no encontrada.' })
	async delete(@Param('id') id: number) {
		await this.notasService.delete(id);
		return CustomRes.json({
			success: true,
			msg: 'Nota eliminada correctamente.',
		});
	}
}

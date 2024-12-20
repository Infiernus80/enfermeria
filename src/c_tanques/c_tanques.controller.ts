import { Body, Controller, Get, Post } from '@nestjs/common';
import { CTanquesService } from './c_tanques.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateCTanquesDto } from './dtos/create-c_tanques.dto';
import { CustomRes } from 'src/common';

@ApiTags('Tanques')
@Controller('c-tanques')
export class CTanquesController {
	constructor(private readonly cTanquesService: CTanquesService) {}

	@Post()
	@ApiOperation({ summary: 'Crear un nuevo tanque' })
	@ApiBody({
		description: 'Datos para crear un nuevo tanque',
		schema: {
			type: 'object',
			properties: {
				cilindro: {
					type: 'string',
					example: 'T',
					description: 'Nombre del tanque ex: E, K, M, Q, T etc',
				},
				volumen_fisico: {
					type: 'number',
					example: 43.49,
					description: 'Volumen físico del tanque',
				},
			},
			required: ['cilindro', 'volumen_fisico'],
		},
		required: true,
	})
	async create(@Body() createCTanquesDto: CreateCTanquesDto) {
		try {
			await this.cTanquesService.create(createCTanquesDto);
			return CustomRes.json({
				success: true,
				msg: 'Tanque creado correctamente',
			});
		} catch (error) {
			return CustomRes.json({
				success: false,
				msg: error.message || 'Algo salió mal',
			});
		}
	}

	@Get()
	@ApiOperation({ summary: 'Obtener todos los tanques' })
	async findAll() {
		try {
			const result = await this.cTanquesService.findAll();
			return CustomRes.json({
				success: true,
				msg: 'Tanques encontrados',
				result,
			});
		} catch (error) {
			return CustomRes.json({
				success: false,
				msg: error.message || 'Algo salió mal',
			});
		}
	}
}

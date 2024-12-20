import { Body, Controller, Post } from '@nestjs/common';
import { GruposFamiliaresService } from './grupos-familiares.service';
import { CreateGrupoFamiliarDto } from './dto/create-grupo-familiar.dto';
import { CustomRes } from 'src/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Grupos Familiares') // Categoría en Swagger
@Controller('grupos-familiares')
export class GruposFamiliaresController {
	constructor(private readonly grupoFamiliarService: GruposFamiliaresService) {}

	@Post()
	@ApiOperation({ summary: 'Crear un nuevo grupo familiar' }) // Descripción breve
	@ApiBody({
		description: 'Datos necesarios para crear un grupo familiar',
		type: CreateGrupoFamiliarDto,
		examples: {
			ejemplo1: {
				summary: 'Ejemplo de grupo familiar',
				value: {
					nombreGrupo: 'Familia Pérez',
					creado_por: 1,
				},
			},
		},
	})
	@ApiResponse({
		status: 201,
		description: 'Grupo familiar creado exitosamente.',
	})
	@ApiResponse({
		status: 400,
		description: 'Error al crear el grupo familiar.',
	})
	async create(@Body() dto: CreateGrupoFamiliarDto) {
		const grupo = await this.grupoFamiliarService.create(dto);

		return CustomRes.json({
			success: true,
			msg: 'Grupo familiar creado exitosamente',
			result: grupo,
		});
	}
}

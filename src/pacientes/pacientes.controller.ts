import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { PacienteService } from './pacientes.service';
import { Paciente } from './paciente.entity';
import { BadRequest, CustomRes } from 'src/common';

@ApiTags('Pacientes') // Categoría en Swagger
@Controller('pacientes')
export class PacienteController {
	constructor(private pacientesService: PacienteService) {}

	@Get()
	@ApiOperation({ summary: 'Obtener todos los pacientes' })
	@ApiResponse({
		status: 200,
		description: 'Lista de pacientes obtenida correctamente.',
	})
	@ApiResponse({
		status: 500,
		description: 'Error interno del servidor.',
	})
	async getAll() {
		try {
			const pacientes = await this.pacientesService.findAll();
			return CustomRes.json({
				success: true,
				msg: 'Pacientes obtenidas correctamente',
				result: pacientes,
			});
		} catch (error) {
			console.error(error);
			return CustomRes.json({
				success: false,
				msg: 'Algo salio mal...',
				result: [error],
			});
		}
	}

	@Get(':id')
	@ApiOperation({ summary: 'Obtener un paciente por ID' })
	@ApiResponse({
		status: 200,
		description: 'Paciente obtenido correctamente.',
	})
	@ApiResponse({
		status: 404,
		description: 'Paciente no encontrado.',
	})
	async getOne(@Param('id') id: number) {
		try {
			const paciente = await this.pacientesService.findOne(id);
			return CustomRes.json({
				success: true,
				msg: 'Usuario obtenido correctamente',
				result: paciente,
			});
		} catch (error) {
			console.error(error);
			throw new BadRequest('Ocurrio un error al obtener el paciente');
		}
	}

	@Post()
	@ApiOperation({ summary: 'Crear un nuevo paciente' })
	@ApiBody({
		description: 'Datos necesarios para crear un paciente',
		type: Paciente,
		examples: {
			ejemplo1: {
				summary: 'Paciente de ejemplo',
				value: {
					nombre: 'Juan Pérez',
					edad: 30,
					grupoFamiliar: { id: 1 },
				},
			},
		},
	})
	@ApiResponse({
		status: 201,
		description: 'Paciente creado correctamente.',
	})
	@ApiResponse({
		status: 400,
		description: 'Datos inválidos o error al crear el paciente.',
	})
	async create(@Body() paciente: Partial<Paciente>) {
		try {
			await this.pacientesService.create(paciente);

			return CustomRes.json({
				success: true,
				msg: 'Paciente creado correctamente',
			});
		} catch (error) {
			console.error(error);
			throw new BadRequest('Ocurrio un error al crear el paciente');
		}
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Eliminar un paciente por ID' })
	@ApiResponse({
		status: 200,
		description: 'Paciente eliminado correctamente.',
	})
	@ApiResponse({
		status: 404,
		description: 'Paciente no encontrado.',
	})
	async delete(@Param('id') id: number) {
		try {
			await this.pacientesService.delete(id);
			return CustomRes.json({
				success: true,
				msg: 'Paciente eliminado correctamente',
			});
		} catch (error) {
			console.error(error);
			throw new BadRequest('Ocurrio un error al eliminar el paciente');
		}
	}
}

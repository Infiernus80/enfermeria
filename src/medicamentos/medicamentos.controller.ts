import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MedicamentosService } from './medicamentos.service';
import { CustomRes } from 'src/common';
import { CreateMedicamentoDto } from './dto/create-medicamento.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Medicamentos') // Categoría para Swagger
@Controller('medicamentos')
export class MedicamentosController {
	constructor(private readonly medicamentoService: MedicamentosService) {}

	@Post('/paciente')
	@ApiOperation({ summary: 'Agregar un medicamento a un paciente' })
	@ApiBody({
		description: 'Datos necesarios para agregar un medicamento',
		type: CreateMedicamentoDto,
		examples: {
			ejemplo1: {
				summary: 'Medicamento de ejemplo',
				value: {
					nombre: 'Paracetamol',
					dosis: '500mg',
					frecuencia_horas: 8,
					id_paciente: 1,
				},
			},
		},
	})
	@ApiResponse({
		status: 201,
		description: 'Medicamento agregado correctamente.',
	})
	@ApiResponse({
		status: 400,
		description: 'Error al agregar el medicamento.',
	})
	async create(@Body() medicamento: CreateMedicamentoDto) {
		try {
			await this.medicamentoService.create(medicamento);
			return CustomRes.json({
				success: true,
				msg: 'Se agrego el medicamento correctamente.',
			});
		} catch (error) {
			return CustomRes.json({
				success: false,
				msg: error.message || 'Ocurrio un error al agregar el medicamento',
			});
		}
	}

	@Get('/paciente/:id')
	@ApiOperation({ summary: 'Obtener medicamentos de un paciente' })
	@ApiResponse({
		status: 200,
		description: 'Medicamentos obtenidos correctamente.',
	})
	@ApiResponse({
		status: 404,
		description: 'Paciente no encontrado.',
	})
	async findByPaciente(@Param('id') id: number) {
		try {
			const result = await this.medicamentoService.findByPaciente(id);
			return CustomRes.json({
				success: true,
				msg: 'Se obtuvieron los medicamentos correctamente.',
				result: result,
			});
		} catch (error) {
			return CustomRes.json({
				success: false,
				msg: error.message || 'Ocurrio un error al mostrar',
			});
		}
	}
}

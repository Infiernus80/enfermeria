import { Module } from '@nestjs/common';
import { HorariosMedicamentosService } from './horarios-medicamentos.service';
import { HorariosMedicamentosController } from './horarios-medicamentos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HorariosMedicamentos } from './horarios-medicamentos.entity';
import { Medicamento } from 'src/medicamentos/medicamentos.entity';
import { Usuario } from 'src/usuarios/usuarios.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([HorariosMedicamentos, Medicamento, Usuario]),
	],
	controllers: [HorariosMedicamentosController],
	providers: [HorariosMedicamentosService],
})
export class HorariosMedicamentosModule {}

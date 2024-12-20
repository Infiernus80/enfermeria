import { Module } from '@nestjs/common';
import { MedicamentosController } from './medicamentos.controller';
import { MedicamentosService } from './medicamentos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medicamento } from './medicamentos.entity';
import { Paciente } from 'src/pacientes/paciente.entity';
import { PacientesModule } from 'src/pacientes/pacientes.module';

@Module({
	imports: [TypeOrmModule.forFeature([Medicamento, Paciente]), PacientesModule],
	controllers: [MedicamentosController],
	providers: [MedicamentosService],
})
export class MedicamentosModule {}

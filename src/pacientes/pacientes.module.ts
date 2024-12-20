import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paciente } from './paciente.entity';
import { PacienteService } from './pacientes.service';
import { PacienteController } from './pacientes.controller';
import { GruposFamiliaresModule } from 'src/grupos-familiares/grupos-familiares.module';

@Module({
	imports: [TypeOrmModule.forFeature([Paciente]), GruposFamiliaresModule],
	providers: [PacienteService],
	controllers: [PacienteController],
	exports: [TypeOrmModule],
})
export class PacientesModule {}

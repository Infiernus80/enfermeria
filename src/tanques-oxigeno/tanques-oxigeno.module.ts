import { Module } from '@nestjs/common';
import { TanquesOxigenoService } from './tanques-oxigeno.service';
import { TanquesOxigenoController } from './tanques-oxigeno.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TanquesOxigeno } from './entities/tanques-oxigeno.entity';
import { Paciente } from 'src/pacientes/paciente.entity';
import { Usuario } from 'src/usuarios/usuarios.entity';
import { PacientesModule } from 'src/pacientes/pacientes.module';
import { CTanques } from '../c_tanques/entities/c_tanques.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([TanquesOxigeno, Paciente, Usuario, CTanques]),
		PacientesModule,
	],
	controllers: [TanquesOxigenoController],
	providers: [TanquesOxigenoService],
})
export class TanquesOxigenoModule {}

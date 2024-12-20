import { Module } from '@nestjs/common';
import { CitasMedicasService } from './citas-medicas.service';
import { CitasMedicasController } from './citas-medicas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitasMedicas } from './entities/citas-medicas.entity';
import { Paciente } from 'src/pacientes/paciente.entity';
import { Usuario } from 'src/usuarios/usuarios.entity';
import { PacientesModule } from 'src/pacientes/pacientes.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([CitasMedicas, Paciente, Usuario]),
		PacientesModule,
	],
	controllers: [CitasMedicasController],
	providers: [CitasMedicasService],
})
export class CitasMedicasModule {}

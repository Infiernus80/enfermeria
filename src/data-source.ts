import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { CTanques } from './c_tanques/entities/c_tanques.entity'; // Importa tus entidades
import { Usuario } from './usuarios/usuarios.entity';
import { TanquesOxigeno } from './tanques-oxigeno/entities/tanques-oxigeno.entity';
import { Paciente } from './pacientes/paciente.entity';
import { Notas } from './notas/entities/notas.entity';
import { Medicamento } from './medicamentos/medicamentos.entity';
import { HorariosMedicamentos } from './horarios-medicamentos/horarios-medicamentos.entity';
import { GruposFamiliares } from './grupos-familiares/grupos-familiares.entity';
import { CitasMedicas } from './citas-medicas/entities/citas-medicas.entity';

export const AppDataSource = new DataSource({
	type: 'postgres', // Cambia al motor de base de datos que usas
	host: 'localhost',
	port: 4001,
	username: 'postgres',
	password: 'pass123',
	database: 'db_enfermeria',
	synchronize: true, // Solo para desarrollo, desactívalo en producción
	logging: true,
	entities: [
		CTanques,
		Usuario,
		TanquesOxigeno,
		Paciente,
		Notas,
		Medicamento,
		HorariosMedicamentos,
		GruposFamiliares,
		CitasMedicas,
	], // Agrega todas las entidades de tu proyecto
	migrations: [],
	subscribers: [],
});

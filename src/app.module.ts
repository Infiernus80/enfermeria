import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { PacientesModule } from './pacientes/pacientes.module';
import { MedicamentosModule } from './medicamentos/medicamentos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GruposFamiliaresModule } from './grupos-familiares/grupos-familiares.module';
import { HorariosMedicamentosModule } from './horarios-medicamentos/horarios-medicamentos.module';
import { TanquesOxigenoModule } from './tanques-oxigeno/tanques-oxigeno.module';
import { CitasMedicasModule } from './citas-medicas/citas-medicas.module';
import { NotasModule } from './notas/notas.module';
import { CTanquesModule } from './c_tanques/c_tanques.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				type: 'postgres',
				host: configService.get<string>('DB_HOST'),
				port: configService.get<number>('DB_PORT'),
				username: configService.get<string>('DB_USER_NAME'),
				password: configService.get<string>('DB_PASSWORD'),
				database: configService.get<string>('DB_NAME'),
				autoLoadEntities: true,
				synchronize: true,
			}),
		}),
		UsuariosModule,
		PacientesModule,
		MedicamentosModule,
		GruposFamiliaresModule,
		HorariosMedicamentosModule,
		TanquesOxigenoModule,
		CitasMedicasModule,
		NotasModule,
		CTanquesModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}

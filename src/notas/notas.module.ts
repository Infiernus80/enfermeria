import { Module } from '@nestjs/common';
import { NotasService } from './notas.service';
import { NotasController } from './notas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notas } from './entities/notas.entity';
import { CitasMedicas } from 'src/citas-medicas/entities/citas-medicas.entity';
import { CitasMedicasModule } from 'src/citas-medicas/citas-medicas.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([Notas, CitasMedicas]),
		CitasMedicasModule,
	],
	controllers: [NotasController],
	providers: [NotasService],
})
export class NotasModule {}

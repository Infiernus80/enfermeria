import { Module } from '@nestjs/common';
import { GruposFamiliaresController } from './grupos-familiares.controller';
import { GruposFamiliaresService } from './grupos-familiares.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GruposFamiliares } from './grupos-familiares.entity';
import { Usuario } from 'src/usuarios/usuarios.entity';

@Module({
	imports: [TypeOrmModule.forFeature([GruposFamiliares, Usuario])],
	controllers: [GruposFamiliaresController],
	providers: [GruposFamiliaresService],
	exports: [TypeOrmModule],
})
export class GruposFamiliaresModule {}

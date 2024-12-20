import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuarios.entity';
import { UsuarioService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';

@Module({
	imports: [TypeOrmModule.forFeature([Usuario])],
	providers: [UsuarioService],
	controllers: [UsuariosController],
})
export class UsuariosModule {}

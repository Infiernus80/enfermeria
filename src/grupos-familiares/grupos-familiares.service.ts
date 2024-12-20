import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GruposFamiliares } from './grupos-familiares.entity';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { Usuario } from 'src/usuarios/usuarios.entity';
import { CreateGrupoFamiliarDto } from './dto/create-grupo-familiar.dto';
import { BadRequest, NotFound } from 'src/common';

@Injectable()
export class GruposFamiliaresService {
	constructor(
		@InjectRepository(GruposFamiliares)
		private readonly grupoFamiliarRepository: Repository<GruposFamiliares>,
		@InjectRepository(Usuario)
		private readonly usuarioRepository: Repository<Usuario>,
		private dataSource: DataSource,
	) {}

	async create(dto: CreateGrupoFamiliarDto): Promise<GruposFamiliares> {
		const queryRunner: QueryRunner = this.dataSource.createQueryRunner();

		await queryRunner.connect();
		await queryRunner.startTransaction();

		try {
			const { creado_por, nombreGrupo } = dto;
			//Validamos que el usuario exista en la base de datos
			const usuario = await this.usuarioRepository.findOne({
				where: { id_usuario: creado_por },
			});

			if (!usuario) {
				throw new NotFound(`Usuario con ID ${creado_por} no encontrado`);
			}

			const nuevoGrupo = queryRunner.manager.create(GruposFamiliares, {
				creadoPor: usuario,
				nombreGrupo,
			});
			await queryRunner.manager.save(nuevoGrupo);

			await queryRunner.commitTransaction();
			return nuevoGrupo;
		} catch (error) {
			await queryRunner.rollbackTransaction(); // Deshace los cambios si hay un error
			console.error(error);
			throw new BadRequest('Error al crear el grupo familiar'); //Lanza el error
		} finally {
			//Liberar el QueryRunner
			await queryRunner.release();
		}
	}

	//Implementar la busqueda del grupo
}

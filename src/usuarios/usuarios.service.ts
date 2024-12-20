import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './usuarios.entity';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { BadRequest, CustomRes } from 'src/common';

@Injectable()
export class UsuarioService {
	constructor(
		@InjectRepository(Usuario)
		private usuarioRepository: Repository<Usuario>,
		private dataSource: DataSource,
	) {}

	async findAll(): Promise<Usuario[]> {
		return this.usuarioRepository.find();
	}

	async create(usuario: CreateUsuarioDto): Promise<Usuario> {
		const queryRunner: QueryRunner = this.dataSource.createQueryRunner();

		await queryRunner.connect();
		await queryRunner.startTransaction();

		try {
			//Validamos que el correo no exista en la base de datos
			const usuarioExistente = await queryRunner.manager.findOne(Usuario, {
				where: { email: usuario.email },
			});

			if (usuarioExistente) {
				throw new BadRequest('Datos existentes en la base de datos');
			}
			//Crear y guardar el nuevo usuario
			const nuevoUsuario = queryRunner.manager.create(Usuario, usuario);
			await queryRunner.manager.save(nuevoUsuario);

			//Confirmarmos la transaccion
			await queryRunner.commitTransaction();
			return nuevoUsuario;
		} catch (error) {
			await queryRunner.rollbackTransaction(); // Deshace los cambios si hay un error
			throw CustomRes.json({
				msg: 'Ocurrio un error al crear el usuario',
				success: false,
				result: error,
			});
		} finally {
			//Liberar el QueryRunner
			await queryRunner.release();
		}
	}
}

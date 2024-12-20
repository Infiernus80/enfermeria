import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsuarioService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { BadRequest, CustomRes } from 'src/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Usuarios')
@Controller('usuarios')
export class UsuariosController {
	constructor(private usuarioService: UsuarioService) {}

	@Get()
	@ApiOperation({ summary: 'Obtener todos los usuarios' })
	@ApiResponse({
		status: 200,
		description: 'Usuarios obtenidos correctamente.',
	})
	@ApiResponse({ status: 400, description: 'Error al obtener los usuarios.' })
	async getAll() {
		try {
			const usuarios = await this.usuarioService.findAll();

			return CustomRes.json({
				success: true,
				msg: 'Usuarios obtenidos correctamente',
				result: usuarios,
			});
		} catch (error) {
			console.error(error);
			throw new BadRequest('Ocurrio un error al obtener los usuarios');
		}
	}

	@Post()
	@ApiOperation({ summary: 'Crear un nuevo usuario' })
	@ApiBody({
		description: 'Datos para crear un usuario',
		schema: {
			type: 'object',
			properties: {
				nombre: {
					type: 'string',
					example: 'Juan Pérez',
					description: 'Nombre del usuario',
				},
				email: {
					type: 'string',
					example: 'juan.perez@example.com',
					description: 'Correo electrónico del usuario',
				},
				password: {
					type: 'string',
					example: 'password123',
					description: 'Contraseña del usuario',
				},
				rol: {
					type: 'string',
					example: 'Admin',
					enum: ['Admin', 'Familiar'],
					description: 'Rol del usuario (Admin o Familiar)',
				},
			},
			required: ['nombre', 'email', 'password', 'rol'],
		},
	})
	@ApiResponse({ status: 201, description: 'Usuario creado exitosamente.' })
	@ApiResponse({ status: 400, description: 'Error al crear el usuario.' })
	async create(@Body() usuario: CreateUsuarioDto) {
		try {
			await this.usuarioService.create(usuario);

			return CustomRes.json({
				success: true,
				msg: 'Usuario creado exitosamente',
			});
		} catch (error) {
			console.error(error);
			return CustomRes.json({
				success: false,
				msg: 'Algo salio mal...',
				result: error,
			});
		}
	}
}

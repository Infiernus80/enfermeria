import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const config = new DocumentBuilder()
		.setTitle('Api Enfermeria')
		.setVersion('1.0')
		.build();
	const documentFactory = () => SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, documentFactory);

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true, // Ignora propiedades no definidas en el DTO
			forbidNonWhitelisted: true, // Lanza error si hay campos desconocidos
			transform: true, // Transforma los datos según el tipo del DTO
			exceptionFactory: errors => {
				// Formato de los errores personalizados
				const formattedErrors = errors.map(err => ({
					field: err.property,
					errors: Object.values(err.constraints),
				}));
				throw new BadRequestException({
					success: false,
					msg: 'Errores de validación',
					errors: formattedErrors,
				});
			},
		}),
	);

	await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

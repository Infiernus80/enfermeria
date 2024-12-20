import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { TanqueSeed } from './tank.seed';

async function runSeed() {
	const app = await NestFactory.createApplicationContext(AppModule); // Inicializa el contexto de Nest
	const tanqueSeed = app.get(TanqueSeed); // Obtiene el servicio de TanqueSeed

	try {
		console.log('Ejecutando semillas...');
		await tanqueSeed.seed(); // Ejecuta la lógica de semillas
		console.log('Semillas ejecutadas correctamente.');
	} catch (error) {
		console.error('Error al ejecutar las semillas:', error);
	} finally {
		await app.close(); // Cierra la aplicación una vez finalizado
	}
}

runSeed();

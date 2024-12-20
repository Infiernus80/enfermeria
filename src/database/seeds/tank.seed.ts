import { Injectable } from '@nestjs/common';
import { CTanques } from '../../c_tanques/entities/c_tanques.entity';
import { DataSource } from 'typeorm';
import { AppDataSource } from '../../data-source';

@Injectable()
export class TanqueSeed {
	constructor(private dataSource: DataSource) {}

	async seed() {
		try {
			// Inicializa la conexión
			if (!AppDataSource.isInitialized) {
				await AppDataSource.initialize();
			}
			const tanqueRepository = this.dataSource.getRepository(CTanques);

			const tanques = [
				{ cilindro: 'ALS', volumen_fisico: 21 },
				{ cilindro: 'D', volumen_fisico: 1.75 },
				{ cilindro: 'Desechable', volumen_fisico: 0.1 },
				{ cilindro: 'E', volumen_fisico: 3.0 },
				{ cilindro: 'G75', volumen_fisico: 0.0375 },
				{ cilindro: 'K', volumen_fisico: 29.5 },
				{ cilindro: 'LD60', volumen_fisico: 0.03 },
				{ cilindro: 'LD65', volumen_fisico: 0.0325 },
				{ cilindro: 'M', volumen_fisico: 15 },
				{ cilindro: 'Permacyl', volumen_fisico: 885 },
				{ cilindro: 'PGS', volumen_fisico: 515 },
				{ cilindro: 'Q', volumen_fisico: 11.9 },
				{ cilindro: 'Respirox', volumen_fisico: 3.5 },
				{ cilindro: 'T', volumen_fisico: 47.45 },
				{ cilindro: 'UG45', volumen_fisico: 0.0225 },
			];

			for (const tanque of tanques) {
				const exist = await tanqueRepository.findOne({
					where: { cilindro: tanque.cilindro },
				});

				if (!exist) {
					const newTanque = tanqueRepository.create(tanque);
					await tanqueRepository.save(newTanque);
				}
			}

			console.log('Tanques seeded correctamente');
		} catch (error) {
			console.log('Error al seedear tanques', error);
		} finally {
			// Cierra la conexión
			await AppDataSource.destroy();
		}
	}
}

import { Injectable } from '@nestjs/common';
import { CreateCTanquesDto } from './dtos/create-c_tanques.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CTanques } from './entities/c_tanques.entity';
import { Repository } from 'typeorm';
import { BadRequest } from 'src/common';

@Injectable()
export class CTanquesService {
	constructor(
		@InjectRepository(CTanques)
		private readonly cTanquesRepository: Repository<CTanques>,
	) {}

	async create(createCTanquesDto: CreateCTanquesDto) {
		try {
			const existTanque = await this.cTanquesRepository.findBy({
				cilindro: createCTanquesDto.cilindro,
			});

			if (existTanque) throw new BadRequest('El tanque ya existe');

			const newTanque = this.cTanquesRepository.create(createCTanquesDto);

			await this.cTanquesRepository.save(newTanque);
		} catch (error) {
			throw new BadRequest(error.message);
		}
	}

	async findAll() {
		return await this.cTanquesRepository.find();
	}
}

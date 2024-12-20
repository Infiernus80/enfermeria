import { Module } from '@nestjs/common';
import { CTanquesService } from './c_tanques.service';
import { CTanquesController } from './c_tanques.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CTanques } from './entities/c_tanques.entity';
import { TanqueSeed } from '../database/seeds/tank.seed';

@Module({
	imports: [TypeOrmModule.forFeature([CTanques])],
	controllers: [CTanquesController],
	providers: [CTanquesService, TanqueSeed],
	exports: [TanqueSeed, TypeOrmModule],
})
export class CTanquesModule {}

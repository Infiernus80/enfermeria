import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateTanqueOxigenoDto {
	@IsNumber()
	@IsNotEmpty()
	flujoLitrosMinuto: number;

	@IsNumber()
	@IsOptional()
	duracionHoras?: number;

	@IsNotEmpty()
	horaInicio: Date;

	@IsOptional()
	horaFin?: Date;

	@IsNumber()
	@IsNotEmpty()
	precionInicial: number;

	@IsOptional()
	estatus?: string;

	@IsNumber()
	@IsNotEmpty()
	idTanque: number;

	@IsNumber()
	@IsNotEmpty()
	idPaciente: number;

	@IsNumber()
	@IsNotEmpty()
	cambiadoPor: number;
}

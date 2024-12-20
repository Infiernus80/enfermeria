import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateCTanquesDto {
	@IsString()
	@IsNotEmpty({ message: 'El cilindro es requerido' })
	cilindro: string;

	@IsNumber({}, { message: 'El volumen físico debe ser un numero positivo' })
	@IsNotEmpty({ message: 'El volumen físico es requerido' })
	volumenFisico: number;
}

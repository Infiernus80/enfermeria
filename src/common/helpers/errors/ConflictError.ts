import { BaseError } from './BaseError';

export class ConfictError extends BaseError {
	public valor_existente: string;

	constructor(valor_existente: string) {
		super(409, `El valor (${valor_existente}) ya existe`, 'Confict Error');
		this.valor_existente = valor_existente;
	}
}

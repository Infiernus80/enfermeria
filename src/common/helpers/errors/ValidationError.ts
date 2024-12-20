import { BaseError } from './BaseError';

export class ValidationError extends BaseError {
	public errors: string[];

	constructor(errors: string[], message = 'Datos erróneos en la petición') {
		super(422, message, 'Validation Error');
		this.errors = errors;
	}
}

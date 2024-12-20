import { BaseError } from './BaseError';

export class Unauthorized extends BaseError {
	constructor(message = 'No tienes permiso para realizar está acción') {
		super(401, message, 'Unauthorized');
	}
}

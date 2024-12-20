import { BaseError } from './BaseError';

export class BadRequest extends BaseError {
	constructor(message = 'Petición incorrecta') {
		super(400, message, 'Bad Request');
	}
}

import { BaseError } from './BaseError';

export class NotFound extends BaseError {
	constructor(message = 'El recurso solicitado no fue encontrado') {
		super(404, message, 'Not Found');
	}
}

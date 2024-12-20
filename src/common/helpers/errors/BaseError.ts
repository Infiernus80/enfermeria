export class BaseError extends Error {
	public status_code: number;
	public name: string;

	constructor(status_code: number, message: string, name: string) {
		super(message);
		this.status_code = status_code;
		this.name = name;
	}
}

export class CustomRes {
	static json(data: { success: boolean; msg: string; result?: any }) {
		return {
			success: data.success,
			msg: data.msg,
			result: data.result || null,
		};
	}
}

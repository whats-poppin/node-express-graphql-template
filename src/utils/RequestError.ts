export default class RequestError extends Error {
    code?: number;

    name: string;

    message: string;

    constructor(code: number, message: string) {
        super(message);
        this.code = code;
        this.message = message;
    }
}

import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidFileExtensionException extends HttpException {
    constructor() {
        super('Invalid file extension provided', HttpStatus.BAD_REQUEST);
    }
}

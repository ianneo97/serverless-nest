import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidFileExtensionException extends HttpException {
    constructor() {
        super('Invalid file extension provided', HttpStatus.BAD_REQUEST);
    }
}

export class InvalidFileNameException extends HttpException {
    constructor() {
        super(
            'Invalid file name provided, must be in format ?/?.jpg',
            HttpStatus.BAD_REQUEST,
        );
    }
}

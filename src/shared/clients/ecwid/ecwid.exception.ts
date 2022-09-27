import { HttpException, HttpStatus } from '@nestjs/common';

export class ProductAlreadyExistsException extends HttpException {
    constructor() {
        super('Product already exists', HttpStatus.CONFLICT);
    }
}

export class MainImageFailedException extends HttpException {
    constructor() {
        super('Failed to update the main image', HttpStatus.CONFLICT);
    }
}

export class GalleryImageFailedException extends HttpException {
    constructor() {
        super('Failed to update the gallery images', HttpStatus.CONFLICT);
    }
}

import { Controller, Get } from '@nestjs/common';
import { ToursService } from './tours.service';
import { Tour } from './tours.model';
@Controller('tours')
export class ToursController {
    constructor(private readonly toursService: ToursService) {}

    @Get()
    async getAllTours(): Promise<Tour[]> {
        return this.toursService.getAllTours();
    }
}

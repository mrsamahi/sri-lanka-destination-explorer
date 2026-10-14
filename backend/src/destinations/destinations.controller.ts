
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ServiceUnavailableException,
  UseGuards,
} from '@nestjs/common';
import { DestinationsService } from './destinations.service';
import { WeatherService } from './weather.service';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { UpdateDestinationDto } from './dto/update-destination.dto';
import { AdminGuard } from '../auth/admin.guard';



@Controller('destinations')
export class DestinationsController {
  constructor(
    private readonly destinationsService: DestinationsService,
    private readonly weatherService: WeatherService,
  ) {}

  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createDestinationDto: CreateDestinationDto) {
    return this.destinationsService.create(createDestinationDto);
  }

  @Get()
  findAll() {
    return this.destinationsService.findAll();
  }

  @Get(':id/weather')
  async getWeather(@Param('id') id: string) {
    const destination = await this.destinationsService.findOne(id);

    try {
      return await this.weatherService.getWeather(
        destination.latitude,
        destination.longitude,
      );
    } catch {
      throw new ServiceUnavailableException(
        'Weather information is temporarily unavailable',
      );
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.destinationsService.findOne(id);
  }

  
    @UseGuards(AdminGuard)
    @Patch(':id')
    update(
      @Param('id') id: string,
      @Body() updateDestinationDto: UpdateDestinationDto,
    ) {
      return this.destinationsService.update(id, updateDestinationDto);
    }

    @UseGuards(AdminGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.destinationsService.remove(id);
    }

}

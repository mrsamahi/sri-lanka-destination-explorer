
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { AdminGuard } from '../auth/admin.guard';
import { DestinationsService } from './destinations.service';
import { DestinationsController } from './destinations.controller';
import { WeatherService } from './weather.service';
import {
  Destination,
  DestinationSchema,
} from './schemas/destination.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      {
        name: Destination.name,
        schema: DestinationSchema,
      },
    ]),
  ],
  controllers: [DestinationsController],
  providers: [DestinationsService, WeatherService, AdminGuard],
})
export class DestinationsModule {}

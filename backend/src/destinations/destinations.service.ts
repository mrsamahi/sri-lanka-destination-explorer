
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Destination } from './schemas/destination.schema';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { UpdateDestinationDto } from './dto/update-destination.dto';

@Injectable()
export class DestinationsService {
  constructor(
    @InjectModel(Destination.name)
    private readonly destinationModel: Model<Destination>,
  ) {}

  async create(createDestinationDto: CreateDestinationDto) {
    const destination = new this.destinationModel(createDestinationDto);
    return destination.save();
  }

  async findAll() {
    return this.destinationModel.find().exec();
  }

  async findOne(id: string) {
    const destination = await this.destinationModel.findById(id).exec();

    if (!destination) {
      throw new NotFoundException('Destination not found');
    }

    return destination;
  }

  async update(id: string, updateDestinationDto: UpdateDestinationDto) {
    const destination = await this.destinationModel
      .findByIdAndUpdate(id, updateDestinationDto, { new: true })
      .exec();

    if (!destination) {
      throw new NotFoundException('Destination not found');
    }

    return destination;
  }

  async remove(id: string) {
    const destination = await this.destinationModel
      .findByIdAndDelete(id)
      .exec();

    if (!destination) {
      throw new NotFoundException('Destination not found');
    }

    return { message: 'Destination deleted successfully' };
  }
}

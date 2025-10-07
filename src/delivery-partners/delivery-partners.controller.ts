import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeliveryPartnersService } from './delivery-partners.service';
import { CreateDeliveryPartnerDto } from './dto/create-delivery-partner.dto';
import { UpdateDeliveryPartnerDto } from './dto/update-delivery-partner.dto';

@Controller('delivery-partners')
export class DeliveryPartnersController {
  constructor(private readonly deliveryPartnersService: DeliveryPartnersService) {}

  @Post()
  create(@Body() createDeliveryPartnerDto: CreateDeliveryPartnerDto) {
    return this.deliveryPartnersService.create(createDeliveryPartnerDto);
  }

  @Get()
  findAll() {
    return this.deliveryPartnersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deliveryPartnersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeliveryPartnerDto: UpdateDeliveryPartnerDto) {
    return this.deliveryPartnersService.update(+id, updateDeliveryPartnerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deliveryPartnersService.remove(+id);
  }
}

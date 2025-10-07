import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OdPairsService } from './od-pairs.service';
import { CreateOdPairDto } from './dto/create-od-pair.dto';
import { UpdateOdPairDto } from './dto/update-od-pair.dto';

@Controller('od-pairs')
export class OdPairsController {
  constructor(private readonly odPairsService: OdPairsService) {}

  @Post()
  create(@Body() createOdPairDto: CreateOdPairDto) {
    return this.odPairsService.create(createOdPairDto);
  }

  @Get()
  findAll() {
    return this.odPairsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.odPairsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOdPairDto: UpdateOdPairDto) {
    return this.odPairsService.update(+id, updateOdPairDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.odPairsService.remove(+id);
  }
}

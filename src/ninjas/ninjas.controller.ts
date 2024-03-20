import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import { BeltGuard } from 'src/belt/belt.guard';

@Controller('ninjas') // everything in this controller have this prefix // or route start with ninjas in this controller
export class NinjasController {
  constructor(private readonly _ninjaService: NinjasService) {}

  @Get()
  getNinjas(@Query('weapon') weapon: 'stars' | 'nunchucks') {
    return this._ninjaService.getNinjas(weapon);
  }

  @Get(':id')
  getOneNinja(@Param('id', ParseIntPipe) id: number) {
    try {
      return this._ninjaService.getNinja(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Post()
  @UseGuards(BeltGuard)
  createNinja(@Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto) {
    return this._ninjaService.createNinja(createNinjaDto);
  }

  @Put(':id')
  updateNinja(@Param('id') id: string, @Body() updateNinjaDto: UpdateNinjaDto) {
    return this._ninjaService.updateNinja(+id, updateNinjaDto);
  }

  @Delete(':id')
  removeNinja(@Param('id') id: string) {
    return this._ninjaService.removeNinja(+id);
  }
}

import { Injectable } from "@nestjs/common";
import { CreateOdPairDto } from "./dto/create-od-pair.dto";
import { UpdateOdPairDto } from "./dto/update-od-pair.dto";

@Injectable()
export class OdPairsService {
  create(createOdPairDto: CreateOdPairDto) {
    return "This action adds a new odPair";
  }

  findAll() {
    return `This action returns all odPairs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} odPair`;
  }

  update(id: number, updateOdPairDto: UpdateOdPairDto) {
    return `This action updates a #${id} odPair`;
  }

  remove(id: number) {
    return `This action removes a #${id} odPair`;
  }
}

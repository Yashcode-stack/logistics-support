import { OdPairsService } from './od-pairs.service';
import { CreateOdPairDto } from './dto/create-od-pair.dto';
import { UpdateOdPairDto } from './dto/update-od-pair.dto';
export declare class OdPairsController {
    private readonly odPairsService;
    constructor(odPairsService: OdPairsService);
    create(createOdPairDto: CreateOdPairDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateOdPairDto: UpdateOdPairDto): string;
    remove(id: string): string;
}
